/**
 * Compares the versions of a dictionary and prints the deleted and the added words.
 */

import chalk from "chalk";
import { pathTo, readDict } from "./lib/io.js";

await compare("build/dictionary-de-old.csv", "build/dictionary-de.csv");

async function compare(oldFile, newFile) {
  const oldWords = wordsOnly(await readDict(pathTo(oldFile)));
  const newWords = wordsOnly(await readDict(pathTo(newFile)));
  for (const word of oldWords) {
    if (!newWords.has(word)) {
      console.log(`Deleted word ${chalk.red(word)}`);
    }
  }
  for (const word of newWords) {
    if (!oldWords.has(word)) {
      console.log(`Added word ${chalk.green(word)}`);
    }
  }
}

function wordsOnly(dict) {
  return new Set(dict.map(([word]) => word));
}
