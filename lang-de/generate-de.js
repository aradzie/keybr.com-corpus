import { MultiDict } from "../lib/dict.js";
import { importRawDict } from "../lib/import-raw-dict.js";
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
