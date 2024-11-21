import { importRawDict } from "../lib/import-raw-dict.js";
import { ptBR } from "./pt.js";

await importRawDict({
  language: ptBR,
  blacklistFiles: ["blacklist/english.txt"],
});
