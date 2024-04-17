import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { es } from "./es.js";

await processCorpus({
  language: es,
  file: ["~/Downloads/corpus/opensubtitles/es.txt"],
  blacklist: loadBlacklist()
    .addFile("lang-es/blacklist.txt")
    .addFile("blacklist/english.txt")
    .add("e", "u", "ó"),
});
