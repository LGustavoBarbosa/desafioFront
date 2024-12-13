import systemPrompt from "core/lmm.sys.prompt";
import { getChatCompletion, ChatMessage } from "providers/openaiApi";
import { SuggestionsEntity } from "domain/entities/SuggestionsEntity";

export class OpenAIRepository {
  async getSuggestion(prompt: string): Promise<SuggestionsEntity[]> {
    const messages: ChatMessage[] = [
      systemPrompt,
      { role: "user", content: prompt },
    ];
    const response = await getChatCompletion(messages);
    debugger;
    const sugestions: SuggestionsEntity[] = JSON.parse(response);
    return sugestions;
  }
}
