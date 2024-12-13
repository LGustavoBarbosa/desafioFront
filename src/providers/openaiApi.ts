import axios from "axios";
import { OPENAI_API_KEY } from "../config/env";
import { modelName } from "core/lmm.sys.prompt";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

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
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}
