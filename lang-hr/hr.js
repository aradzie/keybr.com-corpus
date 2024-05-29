import { Language } from "../lib/language.js";
import { frequent } from "./frequent.js";

const frequentSet = new Set(frequent.slice(0, 5000));

const reAlphabet = /^[abcdefghijklmnoprstuvzčćžđš]+$/u;
const reVowels = /[AEIOUaeiou]/;

export function testWord_hr(word) {
  if (frequentSet.has(word) || frequentSet.has(word.toLocaleLowerCase("hr"))) {
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
}

export const hr = new Language("hr", testWord_hr);
