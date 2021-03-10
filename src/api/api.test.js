import fetch from 'isomorphic-fetch'
import getRepos from "./getRepos";

test("test github api", async ()=>{
  const repos = await getRepos("iptoki");
  expect(repos[0].id).toBe(186482231)
})