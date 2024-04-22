import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { ptBR } from "./pt.js";

await processCorpus({
  language: ptBR,
  file: ["~/Downloads/corpus/opensubtitles/pt_br.txt"],
  blacklist: loadBlacklist()
    .addFile("lang-pt/blacklist-profanity.txt")
    .addFile("blacklist/english.txt"),
});
