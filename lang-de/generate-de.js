import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { MultiDict } from "../lib/dict.js";
import { de } from "./de.js";

// https://github.com/GermanT5/wikipedia2corpus

await processCorpus({
  language: de,
  files: ["~/Downloads/corpus/dewiki-20220201-clean.txt"],
  blacklist: loadBlacklist()
    .add("com", "eng", "etc", "www", "org", "inc")
    .add("bspw", "bzw", "ca", "evtl", "inkl", "usw")
    .addFiles(
      "lang-de/blacklist-cities.txt",
      "lang-de/blacklist-countries.txt",
      "lang-de/blacklist-misc.txt",
      "lang-de/blacklist-profanity.txt",
      "blacklist/english.txt",
    ),
  DictType: MultiDict,
});
