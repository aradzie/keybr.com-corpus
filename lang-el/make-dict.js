import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { loadBlacklist } from "../blacklist/blacklist.js";
import { pathTo, readDict, writeRejected } from "../lib/io.js";
import { SpellChecker } from "../lib/spell-checker.js";
import { el } from "./el.js";
import diffData from "./words-diff.json" with { type: "json" };

await processDict();

async function processDict() {
  const dict = await readDict(pathTo("lang-el/el_50k.csv"));
  const diff = new Map(diffData); // The word list was manually reviewed by George Katsikas (https://github.com/agoatboi).
  const blacklist = loadBlacklist(el);
  const spellChecker = new SpellChecker(el);
  const entries = [];
  const rejected = new Set();
  for (const [originalWord, count] of dict) {
    if (el.testWord(originalWord)) {
      let word = originalWord;
      let subst = diff.get(originalWord) ?? "";
      if (subst) {
        word = subst;
        subst = originalWord;
      }
      if (blacklist.allow(word) && spellChecker.has(word)) {
        entries.push([word, count, subst]);
      } else {
        rejected.add(word);
      }
    }
    if (entries.length === 11000) {
      break;
    }
  }
  await writeDict("lang-el/dict-el.csv", entries, rejected);
}

async function writeDict(file, entries, rejected) {
  const csv = entries.map((line) => `${line.join(",")}\n`).join("");
  await mkdir(dirname(pathTo(file)), { recursive: true });
  await writeFile(pathTo(file), csv);
  await writeRejected(pathTo(file + ".rejected"), rejected);
}
