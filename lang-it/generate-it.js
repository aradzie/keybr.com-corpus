import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { it } from "./it.js";

await processCorpus({
  language: it,
  file: ["/home/caustic/Downloads/corpus/opensubtitles/it.txt"],
  blacklist: loadBlacklist()
    .addFile("lang-it/blacklist-profanity.txt")
    .addFile("lang-it/blacklist-english.txt"),
});
