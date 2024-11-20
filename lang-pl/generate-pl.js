import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { pl } from "./pl.js";

await processCorpus({
  language: pl,
  files: ["/mnt/userdata/corpus/opensubtitles/pl.txt"],
  blacklist: loadBlacklist().addFiles(
    "lang-pl/blacklist.txt",
    "lang-pl/blacklist-profanity.txt",
    "lang-pl/blacklist-sensitive.txt",
    "blacklist/english.txt",
  ),
});
