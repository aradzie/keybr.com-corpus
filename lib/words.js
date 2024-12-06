import chalk from "chalk";
import { readLines } from "./io.js";

export async function readWords(language, path) {
  const words = new Set();
  for await (const word of readLines(path)) {
    if (!language.testWord(word)) {
      console.log(`Extra word ${chalk.red(word)}`);
      continue;
    }
    if (words.has(word)) {
      console.log(`Duplicate word ${chalk.red(word)}`);
      continue;
    }
    words.add(word);
  }
  return words;
}
