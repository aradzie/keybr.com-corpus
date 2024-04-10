import { processCorpus } from "../lib/corpus.js";
import { loadStoplist } from "../stoplist/stoplist.js";
import { en } from "./en.js";

// https://github.com/GermanT5/wikipedia2corpus

await processCorpus({
  language: en,
  file: ["/home/caustic/Downloads/corpus/enwiki-20220201-clean.txt"],
  stoplist: loadStoplist().addFile("lang-en/stoplist.txt"),
});
