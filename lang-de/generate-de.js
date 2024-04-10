import { processCorpus } from "../lib/corpus.js";
import { MultiDict } from "../lib/dict.js";
import { loadStoplist } from "../stoplist/stoplist.js";
import { de } from "./de.js";

// https://github.com/GermanT5/wikipedia2corpus

await processCorpus({
  language: de,
  file: ["/home/caustic/Downloads/corpus/dewiki-20220201-clean.txt"],
  stoplist: loadStoplist()
    .add(["com", "eng", "etc", "www", "org", "inc"])
    .add(["bspw", "bzw", "ca", "evtl", "inkl", "usw"])
    .addFile("lang-de/stoplist-cities.txt")
    .addFile("lang-de/stoplist-countries.txt")
    .addFile("lang-de/stoplist-english.txt")
    .addFile("lang-de/stoplist-misc.txt")
    .addFile("lang-de/stoplist-profanity.txt"),
  DictType: MultiDict,
});
