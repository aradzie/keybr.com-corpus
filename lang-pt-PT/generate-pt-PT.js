import { importRawDict } from "../lib/import-raw-dict.js";
import { pt_PT } from "./pt-PT.js";

await importRawDict({
  language: pt_PT,
  blacklistFiles: ["blacklist/english.txt"],
});
