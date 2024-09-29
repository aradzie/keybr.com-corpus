/**
 * This script merges several dictionaries into one.
 * It prefers words with larger frequencies.
 */

import { sortByCount } from "../lib/dict.js";
import { pathTo, readDict, writeDict } from "../lib/io.js";

const d1 = await readDict(pathTo("lang-de/dictionary-de-movies.csv"));
const d2 = await readDict(pathTo("lang-de/dictionary-de-books.csv"));

const dict = new Map();

for (const d of [d1, d2]) {
  for (const [word, count] of d) {
    const key = word.toLocaleLowerCase("de");
    if (count > (dict.get(key) ?? { word, count: 0 }).count) {
      dict.set(key, { word, count });
    }
  }
}

await writeDict(
  pathTo("lang-de/dictionary-de-merged.csv"),
  sortByCount(
    [...dict.values()] //
      .map(({ word, count }) => [word, count]),
  ).slice(0, 10100),
);
