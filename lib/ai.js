import ollama from "ollama";
import OpenAI from "openai";
import { pathTo } from "./io.js";

process.loadEnvFile(pathTo(".env"));

export async function requestAi(prompt, { model = "gpt-5.4" } = {}) {
  if (model === "gpt-5.4") {
    const client = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });
    const response = await client.responses.create({
      model,
      input: prompt,
    });
    return response.output_text.trim();
  } else {
    const response = await ollama.chat({
      model,
      messages: [{ role: "user", content: prompt }],
    });
    return response.message.content
      .replace("</end_of_turn>", "") //
      .replace("</start_of_turn>", "") //
      .trim();
  }
}
