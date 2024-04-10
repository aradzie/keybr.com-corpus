import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { en } from "./en.js";

// https://github.com/GermanT5/wikipedia2corpus

await processCorpus({
  language: en,
  file: ["~/Downloads/corpus/enwiki-20220201-clean.txt"],
  blacklist: loadBlacklist().addFile("lang-en/blacklist.txt"),
});
