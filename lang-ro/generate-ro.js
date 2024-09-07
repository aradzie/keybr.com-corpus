import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { ro } from "./ro.js";

await processCorpus({
  language: ro,
  files: ["~/Downloads/corpus/opensubtitles/ro.txt"],
  blacklist: loadBlacklist()
    .addFiles(
      "blacklist/english.txt",
      "lang-ro/blacklist.txt",
      "lang-ro/profanity.txt",
    )
    .add(
      "at",
      "ba",
      "be",
      "do",
      "eo",
      "er",
      "et",
      "go",
      "ho",
      "ie",
      "if",
      "io",
      "is",
      "it",
      "me",
      "no",
      "of",
      "on",
      "or",
      "ou",
      "pu",
      "re",
      "so",
      "um",
      "up",
      "î",
      "ăă",
    ),
});
