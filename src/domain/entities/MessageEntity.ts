import { SuggestionsEntity } from "./SuggestionsEntity";

export type MessageRole = "user" | "assistant" | "system" | "system.loading";

export class MessageEntity {
  public readonly id: string;
  public readonly role: MessageRole;
  public readonly content: string | SuggestionsEntity;
  public readonly timestamp: number;
  public readonly loadingText: string | undefined;

  constructor(params: {
    id: string;
    role: MessageRole;
    content: string | SuggestionsEntity;
    loadingText?: string;
    timestamp?: number;
  }) {
    this.id = params.id;
    this.role = params.role;
    this.content = params.content;
    this.loadingText = params.loadingText;
    this.timestamp = params.timestamp || Date.now();
  }
}
