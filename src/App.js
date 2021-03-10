import {useState} from 'react'
import './App.css';
import getRepos from "./api/getRepos";

function App() {
  const [search,setSearch] = useState("");
  const [results,setResults] = useState([]);
  const handleSearchChange= (e)=>{
    setSearch(e.target.value)
  }
  const searchRepos = async ()=>{
    if(search) {
      const results = await getRepos(search);
      setResults(results)
    }
  }
  return (
    <div className="container">
     <div className="search-bar">
       <div className="row">
         <div className="title col-sm-4 col-xs-12">Github Repo Lister</div>
         <div className="search-ui col-sm-8 col-xs-12">
           <div className="search-field-container">
             <i className="bi bi-search"></i>
             <input type="text" value={search} onChange={handleSearchChange} />
           </div>
           <button className="search-button" onClick={searchRepos}>Search</button>
         </div>
       </div>
     </div>
    </div>
  );
}

export default App;
