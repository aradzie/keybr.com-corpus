import { importRawDict } from "../lib/import-raw-dict.js";
import { ga } from "./ga.js";

await importRawDict({
  language: ga,
  blacklistFiles: ["blacklist/english.txt"],
});
