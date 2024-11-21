import { importRawDict } from "../lib/import-raw-dict.js";
import { fr } from "./fr.js";

await importRawDict({
  language: fr,
  blacklistFiles: ["blacklist/english.txt"],
});
