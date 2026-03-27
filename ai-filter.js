import { readFile, writeFile } from "node:fs/promises";
import { requestAi } from "./lib/ai.js";
import { pathTo, readDict } from "./lib/io.js";

const dictPath = pathTo("lang-de/dictionary-de.csv");
const blacklistPath = pathTo("lang-de/blacklist-ai.txt");

class Log {
  static async load() {
    let lines = [];
    try {
      lines = (await readFile(blacklistPath, "utf-8")).split(/\n+/g);
    } catch {}
    return new Log(lines);
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
    await writeFile(blacklistPath, this.#lines.join("\n") + "\n");
  }
}

const entries = await readDict(dictPath);
const chunks = chunkItems(entries, 100).slice(90);
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
    "You are a linguistic filter for the German language.",
    "You will be given a list of German words to check.",
    "Your job is to find profane, obscene, inappropriate words.",
    "Return a list text lines formatted as follows.",
    "If you find a profane or curse word then write a line formatted as `${germanWord}|profane|${englishExplanation}`",
    "If you find a word strongly related to religion, ideology, nationality or racism then write a line formatted as `${germanWord}|sensitive|${englishExplanation}`",
    "If you find a word strongly related to sex then write a line formatted as `${germanWord}|sex|${englishExplanation}`",
    "",
    "The list of German words to check:",
    "",
    ...chunk.map(([word]) => `${word}`),
  ].join("\n");
}
