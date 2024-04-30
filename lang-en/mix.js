/**
 * This script appends rare words to the scanned list of common words.
 */

import chalk from "chalk";
import { sortByCount } from "../lib/dict.js";
import { pathTo, readDict, readLines, writeDict } from "../lib/io.js";

const dict = new Map(await readDict(pathTo("lang-en/dictionary-en-books.csv")));

const mix = [
  ["f", await readWords(pathTo("lang-en/words-f.txt"))],
  ["j", await readWords(pathTo("lang-en/words-j.txt"))],
  ["q", await readWords(pathTo("lang-en/words-q.txt"))],
  ["v", await readWords(pathTo("lang-en/words-v.txt"))],
  ["w", await readWords(pathTo("lang-en/words-w.txt"))],
  ["x", await readWords(pathTo("lang-en/words-x.txt"))],
  ["z", await readWords(pathTo("lang-en/words-z.txt"))],
];

const keep = new Set();

for (const [letter, list] of mix) {
  console.log(`====== ${letter} ======`);
  process(letter, list);
}

trimDict();

await writeDict(pathTo("lang-en/dictionary-en.csv"), sortByCount([...dict]));

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

async function readWords(path) {
  const words = new Set();
  for await (const word of readLines(path)) {
    if (words.has(word)) {
      console.log(`Duplicate word ${chalk.red(word)}`);
    }
    words.add(word);
  }
  return words;
}
