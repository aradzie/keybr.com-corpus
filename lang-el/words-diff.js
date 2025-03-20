/**
 * This scripts computes the difference between the original Greek word list
 * and the word list manually reviewed by George Katsikas (https://github.com/agoatboi).
 */

import { writeFileSync } from "node:fs";
import newList from "./words-el-new.json" with { type: "json" }; // The original list.
import oldList from "./words-el-old.json" with { type: "json" }; // The manually reviewed list.

const diff = [];
for (let i = 0; i < oldList.length; i++) {
  const a = oldList[i];
  const b = newList[i];
  if (a !== b) {
    diff.push([a, b]);
  }
}
writeFileSync("words-diff.json", JSON.stringify(diff, null, 2));
