// The French language does not have (enough) words with letters "K" and "W".
// Here we borrow such words from the English language.

import { readFileSync } from "node:fs";
import { fromCsv } from "../lib/csv.js";
import { sortByCount } from "../lib/dict.js";
import { pathTo } from "../lib/io.js";

const csv = readFileSync(pathTo("build/words-en.csv"), "utf-8");

const english = sortByCount(fromCsv(csv));

const list_k = new Set();
const list_w = new Set();

for (const [word] of english) {
  if (word.indexOf("k") > 0) {
    list_k.add(word);
  }
  if (word.indexOf("w") > 0) {
    list_w.add(word);
  }
}

console.log([...list_k].slice(0, 100).join(" "));
console.log([...list_w].slice(0, 100).join(" "));
