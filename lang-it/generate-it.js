import { importRawDict } from "../lib/import-raw-dict.js";
import { it } from "./it.js";

await importRawDict({
  language: it,
  blacklistFiles: ["blacklist/english.txt"],
});
