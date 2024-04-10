import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { ptBR } from "./pt-BR.js";

await processCorpus({
  language: ptBR,
  file: ["~/Downloads/corpus/opensubtitles/pt.txt"],
  blacklist: loadBlacklist()
    .addFile("lang-pt-BR/blacklist-profanity.txt")
    .addFile("lang-pt-BR/blacklist-english.txt"),
});
