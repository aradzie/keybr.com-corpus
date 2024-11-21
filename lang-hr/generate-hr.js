import { importRawDict } from "../lib/import-raw-dict.js";
import { hr } from "./hr.js";

await importRawDict({
  language: hr,
  blacklistFiles: ["blacklist/english.txt"],
});
