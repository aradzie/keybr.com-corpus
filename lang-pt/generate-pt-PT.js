import { importRawDict } from "../lib/import-raw-dict.js";
import { ptPT } from "./pt.js";

await importRawDict({
  language: ptPT,
  blacklistFiles: ["blacklist/english.txt"],
});
