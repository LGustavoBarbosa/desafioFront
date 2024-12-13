import axios from "axios";
import { modelName } from "core/lmm.sys.prompt";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};
const apiKey = import.meta?.env?.VITE_OPENAI_API_KEY || "";

export async function getChatCompletion(
  messages: ChatMessage[]
): Promise<string> {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: modelName,
      messages,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}
