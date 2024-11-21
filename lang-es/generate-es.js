import { importRawDict } from "../lib/import-raw-dict.js";
import { es } from "./es.js";

await importRawDict({
  language: es,
  blacklistFiles: ["blacklist/english.txt"],
});
