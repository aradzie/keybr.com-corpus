import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { replace } from "./replace.js";
import { ro } from "./ro.js";

await processCorpus({
  language: ro,
  files: ["~/Downloads/corpus/opensubtitles/ro.txt"],
  blacklist: loadBlacklist().addFiles(
    "blacklist/english.txt",
    "lang-ro/blacklist.txt",
  ),
  replace,
});
