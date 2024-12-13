import axios from "axios";
import { MessageEntity } from "../entities/MessageEntity";

export class GitHubRepository {
  async fetchReposByUser(username: string): Promise<any[]> {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=stars&direction=desc`
    );
    return res.data;
  }
  async getUserRepos(username: string): Promise<MessageEntity[]> {
    const data = await this.fetchReposByUser(username);
    return data.map((repo: any) => new MessageEntity(repo));
  }
}
