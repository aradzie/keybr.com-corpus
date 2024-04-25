import { Language } from "../lib/language.js";
import { frequent } from "./frequent.js";

const frequentSet = new Set(frequent);

const reAlphabet = /^[abcdefghijklmnopqrstuvwxyz]+$/u;
const reVowels = /[AEIOUYaeiouy]/;

export const en = new Language("en", (word) => {
  if (frequentSet.has(word) || frequentSet.has(word.toLocaleLowerCase("en"))) {
    return true;
  }
  if (word.length > 20) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  if (!reVowels.test(word)) {
    return false;
  }
  return true;
});
