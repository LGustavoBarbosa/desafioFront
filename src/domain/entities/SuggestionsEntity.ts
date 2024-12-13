export interface SuggestionsEntity {
  name: string;
  description: string;
  stars: number;
  languages: string[];
  owner: string;
  url: string;
  curiosity: string;
  youKnew: string;
  integration: string;
  llm: {
    example_code: string;
    pattern_usage: string;
    real_world_application: string;
    suggestion_better_this_repo: string;
  }[];
}
