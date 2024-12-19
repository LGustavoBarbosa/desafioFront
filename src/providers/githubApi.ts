import axios from "axios";

export interface GitHubRepoDTO {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export async function fetchReposByUser(username: string): Promise<any[]> {
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?sort=stars&direction=desc`
  );
  return res.data;
}
