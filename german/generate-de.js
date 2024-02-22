import { processCorpus } from "../lib/corpus.js";
import { MultiDict } from "../lib/dict.js";
import { de } from "../lib/languages.js";
import { loadStoplist } from "../stoplist/stoplist.js";

// https://github.com/GermanT5/wikipedia2corpus

await processCorpus({
  language: de,
  file: ["/home/caustic/Downloads/corpus/dewiki-20220201-clean.txt"],
  stoplist: loadStoplist()
    .add(["com", "eng", "etc", "www", "org", "inc"])
    .add(["bspw", "bzw", "ca", "evtl", "inkl", "usw"])
    .addFile("german/stoplist-cities.txt")
    .addFile("german/stoplist-countries.txt")
    .addFile("german/stoplist-english.txt")
    .addFile("german/stoplist-misc.txt")
    .addFile("german/stoplist-profanity.txt"),
  DictType: MultiDict,
});
