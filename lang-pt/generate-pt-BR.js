import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { ptBR } from "./pt.js";

await processCorpus({
  language: ptBR,
  files: ["~/Downloads/corpus/opensubtitles/pt_br.txt"],
  blacklist: loadBlacklist().addFiles(
    "lang-pt/blacklist-profanity.txt",
    "blacklist/english.txt",
  ),
});
