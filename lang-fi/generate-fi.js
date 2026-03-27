import { importRawDict } from "../lib/import-raw-dict.js";
import { pathTo } from "../lib/io.js";
import { fi } from "./fi.js";

await importRawDict({
  inputFile: pathTo("lang-fi/dictionary-fi-spellchecked.csv"),
  language: fi,
});
