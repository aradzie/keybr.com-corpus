/**
 * This script appends rare words to the scanned list of common words.
 */

import chalk from "chalk";
import { readFileSync, writeFileSync } from "node:fs";
import { fromCsv, toCsv } from "../lib/csv.js";
import { sortByCount } from "../lib/dict.js";
import { pathTo } from "../lib/io.js";

const dict = readDict(pathTo("lang-en/dictionary-en-books.csv"));
const wj = ["j", readWords(pathTo("lang-en/words-j.txt"))];
const wq = ["q", readWords(pathTo("lang-en/words-q.txt"))];
const wx = ["x", readWords(pathTo("lang-en/words-x.txt"))];
const wz = ["z", readWords(pathTo("lang-en/words-z.txt"))];

const keep = new Set();

for (const [letter, list] of [wj, wq, wx, wz]) {
  console.log(`====== ${letter} ======`);
  process(letter, list);
}

trimDict();

writeDict(pathTo("lang-en/dictionary-en.csv"), [...dict]);

function process(letter, list) {
  for (const word of dict.keys()) {
    if (word.includes(letter)) {
      if (!list.has(word)) {
        dict.delete(word);
        console.log(`Deleted word ${chalk.red(word)}`);
      }
    }
  }
  for (const word of list) {
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
        break;
      }
    }
  }
}

function writeDict(path, dict) {
  writeFileSync(path, toCsv(sortByCount([...dict])));
}

function readDict(path) {
  return new Map(fromCsv(readFileSync(path, "utf-8")));
}

function readWords(path) {
  return new Set(
    readFileSync(path, "utf-8")
      .split("\n")
      .filter((w) => w.length > 0),
  );
}
