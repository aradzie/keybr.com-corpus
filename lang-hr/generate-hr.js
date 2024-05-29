import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { hr } from "./hr.js";

await processCorpus({
  language: hr,
  files: ["~/Downloads/corpus/opensubtitles/hr.txt"],
  blacklist: loadBlacklist().addFiles(
    "lang-hr/blacklist-profanity.txt",
    "lang-hr/blacklist-other.txt",
  ),
});
