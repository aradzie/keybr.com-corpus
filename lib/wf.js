import { readFileSync } from "node:fs";
import { fromCsv } from "./csv.js";
import { pathTo } from "./io.js";

export function getWordFrequency(id) {
  const path = pathTo(`FrequencyWords/content/2018/${id}/${id}_50k.txt`);
  const text = readFileSync(path, "utf-8");
  return fromCsv(text);
}
