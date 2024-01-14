import { pathTo, readCsv, writeDict } from "../lib/io.js";
import { ru } from "../lib/languages.js";

// http://dict.ruslang.ru/freq.php

writeDict(ru, await processDict());

async function processDict() {
  const dict = new Map();
  for await (const cols of readCsv(pathTo("russian/freqrnc2011.csv"))) {
    const [word, pos, c, d, e, f] = cols;
    const ipm = Number(c);
    const R = Number(d);
    const D = Number(e);
    const Doc = Number(f);
    if (ru.testWord(word)) {
      const prev = dict.get(word);
      if (prev == null || prev.ipm < ipm) {
        const entry = { word, pos, ipm, R, D, Doc };
        dict.set(word, entry);
      }
    }
  }
  return [...dict.values()].map(({ word, ipm }) => [word, Math.round(ipm)]);
}
