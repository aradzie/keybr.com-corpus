import { importRawDict } from "../lib/import-raw-dict.js";
import { en } from "./en.js";

async function run() {
  await importRawDict({
    language: en,
    inputFile: "raw/dict-en-books.csv.gz",
    outputFile: "lang-en/dictionary-en-books.csv",
  });

  await importRawDict({
    language: en,
    inputFile: "raw/dict-en-wiki.csv.gz",
    outputFile: "lang-en/dictionary-en-wiki.csv",
  });

  await importRawDict({
    language: en,
    inputFile: "raw/dict-en-news.csv.gz",
    outputFile: "lang-en/dictionary-en-news.csv",
  });
}

run().catch((err) => {
  console.error(err);
});
