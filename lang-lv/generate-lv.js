import { importRawDict } from "../lib/import-raw-dict.js";
import { pathTo } from "../lib/io.js";
import { lv } from "./lv.js";

await importRawDict({
  inputFile: pathTo("lang-lv/dictionary-lv-spellchecked.csv"),
  language: lv,
});
