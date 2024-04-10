import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { fr } from "./fr.js";

await processCorpus({
  language: fr,
  file: ["~/Downloads/corpus/opensubtitles/fr.txt"],
  blacklist: loadBlacklist()
    .addFile("lang-fr/blacklist-profanity.txt")
    .addFile("lang-fr/blacklist-english.txt")
    .add("âcdeéhijlmnosu".split("")),
});
