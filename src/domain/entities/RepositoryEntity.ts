export class RepositoryEntity {
    public readonly id: number
    public readonly name: string
    public readonly description: string
    public readonly url: string
    public readonly stars: number
  
    constructor(params: {
      id: number
      name: string
      description: string
      html_url: string
      stargazers_count: number
    }) {
      this.id = params.id
      this.name = params.name
      this.description = params.description
      this.url = params.html_url
      this.stars = params.stargazers_count
    }
  }
  