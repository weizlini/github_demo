import { useState } from "react";
import "./App.css";
import getRepos from "./api/getRepos";

const alphaSort = (a, b) =>
  a.full_name.toLowerCase() > b.full_name.toLowerCase() ? 1 : -1;
const starSort = (a, b) => {
  return a.stargazers_count > b.stargazers_count
    ? 1
    : a.stargazers_count === b.stargazers_count
    ? 0
    : -1;
};
function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [sortAlpha, setSortAlpha] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      searchRepos();
    }
  };
  const searchRepos = async () => {
    if (search) {
      setQuery(search);
      const results = await getRepos(search);
      setResults(results);
      // sortResults();
    }
  };
  const changeSort = (sortAlpha) => {
    setSortAlpha(sortAlpha);
  };
  return (
    <div className="container">
      <div className="search-bar">
        <div className="row">
          <div className="title col-sm-4 col-xs-12">Github Repo Lister</div>
          <div className="search-ui col-sm-8 col-xs-12">
            <div className="search-field-container">
              <i className="bi bi-search" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onKeyUp={handleKeyUp}
              />
            </div>
            <button className="search-button" onClick={searchRepos}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="results-container">
        {query && (
          <div className="results-title">
            Listing repositories for "{query}"
          </div>
        )}
        {query && results.length ? (
          <div className="results-sort">
            <label>Sort</label>
            <button
              className={sortAlpha ? "selected" : ""}
              onClick={() => {
                setSortAlpha(true);
              }}
            >
              Alphabetically
            </button>
            <button
              className={!sortAlpha ? "selected" : ""}
              onClick={() => {
                setSortAlpha(false);
              }}
            >
              By Most Stars
            </button>
          </div>
        ) : null}
        <div className="results-view row">
          {query && results.length ? (
            <>
              {results.sort(sortAlpha ? alphaSort : starSort).map((repo) => (
                <div className="col-sm-3 col-xs-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title" title={repo.full_name}>
                        {repo.full_name}
                      </h5>
                      <h6 className="card-subtitle">
                        {repo.stargazers_count} Stargazer
                        {repo.stargazers_count !== 1 ? "s" : ""}{" "}
                        {repo.watchers_count}{" "}
                        {repo.watchers_count === 1 ? "person" : "people"}{" "}
                        watching
                      </h6>
                      <div className="card-text">
                        {repo.description ? (
                          repo.description
                        ) : (
                          <em>no description</em>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : null}
          {query && !results.length && (
            <div className="search-hint">
              <i className="bi bi-search" /> No Results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
