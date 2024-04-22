import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { ptPT } from "./pt.js";

await processCorpus({
  language: ptPT,
  file: ["~/Downloads/corpus/opensubtitles/pt.txt"],
  blacklist: loadBlacklist()
    .addFile("lang-pt/blacklist-profanity.txt")
    .addFile("blacklist/english.txt"),
});
