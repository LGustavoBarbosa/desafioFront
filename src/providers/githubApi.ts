import axios from 'axios'

export async function fetchReposByUser(username: string): Promise<any[]> {
  const res = await axios.get(`https://api.github.com/users/${username}/repos?sort=stars&direction=desc`)
  return res.data
}
