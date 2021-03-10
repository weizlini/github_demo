import fetch from 'isomorphic-fetch'

/**
 * this async function will always return an array
 * 404s or transport errors will currently return an
 * empty array.
 *
 * in a more sophisticated app we, of course would want to
 * make some kind of more sophisticated error handling
 *
 * @param orgOrUser
 * @returns {Promise<*[]|*>}
 */
export default async function getRepos(orgOrUser){
   try {
      const response = await fetch(`https://api.github.com/orgs/${orgOrUser}/repos`)
      if (response.ok)
         return response.json()
      else {
         const userResponse = await fetch(`https://api.github.com/users/${orgOrUser}/repos`)
         if(userResponse.ok)
            return userResponse.json()
         else return []
      }

   }catch(e){
      console.error('fetch error: ', e);
      return []
   }
}