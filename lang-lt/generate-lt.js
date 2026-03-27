import { importRawDict } from "../lib/import-raw-dict.js";
import { pathTo } from "../lib/io.js";
import { lt } from "./lt.js";

await importRawDict({
  inputFile: pathTo("lang-lt/dictionary-lt-spellchecked.csv"),
  language: lt,
});
