import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { ptPT } from "./pt.js";

await processCorpus({
  language: ptPT,
  files: ["~/Downloads/corpus/opensubtitles/pt.txt"],
  blacklist: loadBlacklist().addFiles(
    "lang-pt/blacklist-profanity.txt",
    "blacklist/english.txt",
  ),
});
