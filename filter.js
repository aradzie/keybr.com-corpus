import { Ollama } from "ollama";
import { pathTo, readDict, writeRejected } from "./lib/io.js";

const ollama = new Ollama({});

const entries = await readDict(pathTo("lang-fi/dictionary-fi.csv"));
const chunks = chunkItems(entries, 100);
const blacklist = new Set();

for (const [index, chunk] of chunks.entries()) {
  console.log(`Chunk ${index + 1}/${chunks.length}`);
  const response = await ollama.generate({
    model: "gpt-oss:20b",
    prompt: buildPrompt(chunk),
  });
  for (const word of response.response.split(/\s+/)) {
    blacklist.add(word);
  }
  await writeRejected(pathTo("lang-fi/blacklist-ai.txt"), blacklist);
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
    "You are a linguistic filter for the Finnish language.",
    "",
    "You will be given a list of Finnish words to check.",
    "",
    "Your job is to find profane words similar to 'vittu', 'pillu', 'paska' and the like.",
    "",
    "Return a list of profane words separated by space, or empty response.",
    "",
    "The list of Finnish words to check:",
    "",
    ...chunk.map(([word]) => `${word}`),
  ].join("\n");
}
