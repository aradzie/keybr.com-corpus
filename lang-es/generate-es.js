import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { es } from "./es.js";

await processCorpus({
  language: es,
  files: ["~/Downloads/corpus/opensubtitles/es.txt"],
  blacklist: loadBlacklist()
    .addFiles("lang-es/blacklist.txt", "blacklist/english.txt")
    .add("e", "u", "ó"),
});
