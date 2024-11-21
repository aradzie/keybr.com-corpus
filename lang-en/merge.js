import { sortByCount } from "../lib/dict.js";
import { pathTo, readDict, writeDict } from "../lib/io.js";

const d1 = await readDict(pathTo("lang-en/dictionary-en-books.csv"));
const d2 = await readDict(pathTo("lang-en/dictionary-en-news.csv"));
const d3 = await readDict(pathTo("lang-en/dictionary-en-wiki.csv"));

const dict = new Map();

for (const d of [d1, d2, d3]) {
  for (const [word, count] of d) {
    if (count > (dict.get(word) ?? 0)) {
      dict.set(word, count);
    }
  }
}

await writeDict(
  pathTo("lang-en/dictionary-en-merged.csv"),
  sortByCount([...dict]),
);
