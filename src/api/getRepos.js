import fetch from 'isomorphic-fetch'

export default async function getRepos(org){
   const response = await fetch(`https://api.github.com/orgs/${org}/repos`)
   return response.json()
}