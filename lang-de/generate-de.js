import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { MultiDict } from "../lib/dict.js";
import { pathTo } from "../lib/io.js";
import { de } from "./de.js";

await processCorpus({
  language: de,
  files: [
    "~/Downloads/corpus/opensubtitles/de.txt",
    pathTo("lang-de/corpus/*.txt"),
  ],
  blacklist: loadBlacklist()
    .add("com", "eng", "etc", "www", "org", "inc")
    .add("bspw", "bzw", "ca", "evtl", "inkl", "usw")
    .addFiles(
      "lang-de/blacklist-cities.txt",
      "lang-de/blacklist-countries.txt",
      "lang-de/blacklist-misc.txt",
      "lang-de/blacklist-names.txt",
      "lang-de/blacklist-profanity.txt",
      "lang-de/blacklist-sensitive.txt",
      "blacklist/english.txt",
    ),
  DictType: MultiDict,
});
