import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { fr } from "./fr.js";

await processCorpus({
  language: fr,
  files: ["~/Downloads/corpus/opensubtitles/fr.txt"],
  blacklist: loadBlacklist()
    .addFiles("lang-fr/blacklist-profanity.txt", "blacklist/english.txt")
    .add("âcdeéhijlmnosu".split("")),
});
