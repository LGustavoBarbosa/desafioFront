import axios from "axios";
import { RepositoryEntity } from "domain/entities/RepositoryEntity";
import { GitHubRepoDTO } from "providers/githubApi";

export class GitHubRepository {
  async fetchReposByUser(username: string): Promise<GitHubRepoDTO[]> {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=stars&direction=desc`
    );
    return res.data;
  }
  async getUserRepos(username: string): Promise<RepositoryEntity[]> {
    const data = await this.fetchReposByUser(username);
    debugger;
    return data?.map((repo: GitHubRepoDTO) => new RepositoryEntity(repo));
  }
}
