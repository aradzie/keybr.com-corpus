/**
 * This script appends rare words to the scanned list of common words.
 */

import chalk from "chalk";
import { sortByCount } from "../lib/dict.js";
import { pathTo, readDict, writeDict } from "../lib/io.js";
import { readWords } from "../lib/words.js";
import { uk } from "./uk.js";

const dict = new Map(await readDict(pathTo("lang-uk/dictionary-uk.csv")));

const mix = [["ґ", await readWords(uk, pathTo("lang-uk/words-ґ.txt"))]];

const keep = new Set();

for (const [letter, list] of mix) {
  console.log(`====== ${letter} ======`);
  process(letter, list);
}

trimDict();

await writeDict(
  pathTo("lang-uk/dictionary-uk-mixed.csv"),
  sortByCount([...dict]),
);

function process(letter, list) {
  for (const word of dict.keys()) {
    if (word.includes(letter)) {
      keep.add(word);
    }
  }
  for (const word of list) {
    if (!word.includes(letter)) {
      throw new Error(`Word ${word} does not include letter ${letter}`);
    }
    if (!dict.has(word)) {
      dict.set(word, 1);
      console.log(`Added word ${chalk.green(word)}`);
    }
    keep.add(word);
  }
}

function trimDict() {
  const words = [...dict.keys()].reverse();
  while (dict.size > 10000) {
    for (const word of words) {
      if (dict.has(word) && !keep.has(word)) {
        dict.delete(word);
        console.log(`Deleted word ${chalk.red(word)}`);
        break;
      }
    }
  }
}
