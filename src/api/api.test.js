import fetch from 'isomorphic-fetch'
import getRepos from "./getRepos";

test("test getRepos with an org", async ()=>{
  const repos = await getRepos("iptoki");
  expect(repos[0].id).toBe(186482231)
})

test("test getRepos with a user", async ()=>{
  const repos = await getRepos("weizlini");
  expect(repos[0].id).toBe(202314895)
})