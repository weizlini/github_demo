import fetch from 'isomorphic-fetch'
import getRepos from "./getRepos";

/**
 * tests a known org, a known user and a 404 type response
 */

test("test getRepos with an org", async ()=>{
  const repos = await getRepos("iptoki");
  expect(repos[0].id).toBe(186482231)
})

test("test getRepos with a user", async ()=>{
  const repos = await getRepos("weizlini");
  expect(repos[0].id).toBe(202314895)
})

test("that empty array is returned when not found ",async ()=>{
  const repos = await getRepos("asdfasdf987");
  expect(repos.length).toBe(0)
})