import { importRawDict } from "../lib/import-raw-dict.js";
import { replace } from "./replace.js";
import { ro } from "./ro.js";

await importRawDict({
  language: ro,
  blacklistFiles: ["blacklist/english.txt"],
  fix: replace,
});
