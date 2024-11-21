import { importRawDict } from "../lib/import-raw-dict.js";
import { nl } from "./nl.js";

await importRawDict({
  language: nl,
  blacklistFiles: ["blacklist/english.txt"],
});
