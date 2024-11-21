import { importRawDict } from "../lib/import-raw-dict.js";
import { pl } from "./pl.js";

await importRawDict({
  language: pl,
  blacklistFiles: ["blacklist/english.txt"],
});
