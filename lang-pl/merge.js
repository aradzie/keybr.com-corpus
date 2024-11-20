import { sortByCount } from "../lib/dict.js";
import { pathTo, readDict, writeDict } from "../lib/io.js";

const d1 = await readDict(pathTo("lang-pl/dictionary-pl-books.csv"));
const d2 = await readDict(pathTo("lang-pl/dictionary-pl-movies.csv"));

const dict = new Map();

for (const d of [d1, d2]) {
  for (const [word, count] of d) {
    if (count > (dict.get(word) ?? 0)) {
      dict.set(word, count);
    }
  }
}

await writeDict(
  pathTo("lang-pl/dictionary-pl-merged.csv"),
  sortByCount([...dict]),
);
