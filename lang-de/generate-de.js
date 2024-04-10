import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { MultiDict } from "../lib/dict.js";
import { de } from "./de.js";

// https://github.com/GermanT5/wikipedia2corpus

await processCorpus({
  language: de,
  file: ["~/Downloads/corpus/dewiki-20220201-clean.txt"],
  blacklist: loadBlacklist()
    .add(["com", "eng", "etc", "www", "org", "inc"])
    .add(["bspw", "bzw", "ca", "evtl", "inkl", "usw"])
    .addFile("lang-de/blacklist-cities.txt")
    .addFile("lang-de/blacklist-countries.txt")
    .addFile("lang-de/blacklist-english.txt")
    .addFile("lang-de/blacklist-misc.txt")
    .addFile("lang-de/blacklist-profanity.txt"),
  DictType: MultiDict,
});
