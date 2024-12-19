import { GitHubRepoDTO } from "providers/githubApi";

export class RepositoryEntity implements GitHubRepoDTO {
  public readonly id: number;
  public readonly name: string;
  public readonly full_name: string;
  public readonly description: string | null;
  public readonly html_url: string;
  public readonly stargazers_count: number;
  public readonly forks_count: number;
  public readonly language: string | null;

  constructor(params: {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.full_name = params.full_name;
    this.description = params.description;
    this.html_url = params.html_url;
    this.stargazers_count = params.stargazers_count;
    this.forks_count = params.forks_count;
    this.language = params.language;
  }
}
