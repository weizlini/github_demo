import fetch from 'isomorphic-fetch'

export default async function getRepos(orgOrUser){
   try {
      const response = await fetch(`https://api.github.com/orgs/${orgOrUser}/repos`)
      if (response.ok)
         return response.json()
      else {
         const userResponse = await fetch(`https://api.github.com/users/${orgOrUser}/repos`)
         if(userResponse.ok)
            return userResponse.json()
      }

   }catch(e){
      console.error('fetch error: ', e);
      return []
   }
}