import { importRawDict } from "../lib/import-raw-dict.js";
import { pt_BR } from "./pt-BR.js";

await importRawDict({
  language: pt_BR,
  blacklistFiles: ["blacklist/english.txt"],
});
