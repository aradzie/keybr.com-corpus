import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { it } from "./it.js";

await processCorpus({
  language: it,
  files: ["~/Downloads/corpus/opensubtitles/it.txt"],
  blacklist: loadBlacklist().addFiles(
    "lang-it/blacklist-profanity.txt",
    "blacklist/english.txt",
  ),
});
