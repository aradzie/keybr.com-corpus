/**
 * Compares the versions of a dictionary and prints the deleted and the added words.
 */

import { readFileSync } from "node:fs";
import { fromCsv } from "./lib/csv.js";
import { pathTo } from "./lib/io.js";

compare("build/dictionary-es-old.csv", "build/dictionary-es.csv");

function compare(file_a, file_b) {
  const words_a = wordsOnly(fromCsv(readFileSync(pathTo(file_a), "utf-8")));
  const words_b = wordsOnly(fromCsv(readFileSync(pathTo(file_b), "utf-8")));
  const added = [...findAdded(words_a, words_b)].sort();
  const deleted = [...findDeleted(words_a, words_b)].sort();
  console.log("Added words:", "\x1b[32m", added.join(","), "\x1b[0m");
  console.log("Deleted words:", "\x1b[31m", deleted.join(","), "\x1b[0m");
}

function wordsOnly(dict) {
  return new Set(dict.map(([word]) => word));
}

function findAdded(a, b) {
  const s = new Set();
  for (const word of b) {
    if (!a.has(word)) {
      s.add(word);
    }
  }
  return s;
}

function findDeleted(a, b) {
  const s = new Set();
  for (const word of a) {
    if (!b.has(word)) {
      s.add(word);
    }
  }
  return s;
}
