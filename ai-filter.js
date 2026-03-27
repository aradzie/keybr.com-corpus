import { readFile, writeFile } from "node:fs/promises";
import { requestAi } from "./lib/ai.js";
import { pathTo, readDict } from "./lib/io.js";

class Log {
  static path = pathTo("lang-es/blacklist-ai.txt");

  static async load() {
    return new Log(
      (await readFile(Log.path, "utf-8")).split(/\n+/g).filter(Boolean),
    );
  }

  #lines = [];

  constructor(lines) {
    for (const line of lines) {
      if (line) {
        this.#lines.push(line);
      }
    }
  }

  push(...lines) {
    this.#lines.push(...lines);
  }

  async save() {
    await writeFile(Log.path, this.#lines.join("\n") + "\n");
  }
}

const entries = await readDict(pathTo("lang-es/dictionary-es.csv"));
const chunks = chunkItems(entries, 100);
const log = await Log.load();

for (const [index, chunk] of chunks.entries()) {
  console.log(`Chunk ${index + 1}/${chunks.length}`);
  const response = await requestAi(buildPrompt(chunk), {
    // model: "qwen3:14b",
  });
  console.log(response);
  log.push(...response.split(/\n+/g).filter(Boolean));
  await log.save();
}

function chunkItems(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function buildPrompt(chunk) {
  return [
    "You are a linguistic filter for the Spanish language.",
    "You will be given a list of Spanish words to check.",
    "Your job is to find profane, obscene, inappropriate words.",
    "Return a list text lines formatted as follows.",
    "If you find a profane or curse word then write a line formatted as `${spanishWord}|profane|${englishExplanation}`",
    "If you find a word strongly related to religion, ideology, nationality or racism then write a line formatted as `${spanishWord}|sensitive|${englishExplanation}`",
    "If you find a word strongly related to sex then write a line formatted as `${spanishWord}|sex|${englishExplanation}`",
    "",
    "The list of Spanish words to check:",
    "",
    ...chunk.map(([word]) => `${word}`),
  ].join("\n");
}
