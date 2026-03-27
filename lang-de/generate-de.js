import { MultiDict, sortByCount } from "../lib/dict.js";
import { importRawDict } from "../lib/import-raw-dict.js";
import { pathTo, readDict, writeDict } from "../lib/io.js";
import { parseCorpus } from "../lib/parse-corpus.js";
import { de } from "./de.js";

await parseCorpus({
  language: de,
  inputFiles: ["lang-de/corpus/*.txt"],
  outputFile: "lang-de/dictionary-de-books.csv",
  blacklistFiles: ["blacklist/english.txt"],
  DictType: MultiDict,
});

await importRawDict({
  language: de,
  outputFile: "lang-de/dictionary-de-movies.csv",
  blacklistFiles: ["blacklist/english.txt"],
  DictType: MultiDict,
});

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
