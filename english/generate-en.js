import { processCorpus } from "../lib/corpus.js";
import { en } from "../lib/languages.js";
import { loadStoplist } from "../stoplist/stoplist.js";

// https://github.com/GermanT5/wikipedia2corpus

await processCorpus({
  language: en,
  file: ["/home/caustic/Downloads/corpus/enwiki-20220201-clean.txt"],
  stoplist: loadStoplist().addFile("english/stoplist.txt"),
});
