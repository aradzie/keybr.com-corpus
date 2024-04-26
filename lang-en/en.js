import { Language } from "../lib/language.js";

const reAlphabet = /^[abcdefghijklmnopqrstuvwxyz]+$/u;
const reVowels = /[AEIJOUYaeijouy]/;

export const en = new Language("en", (word) => {
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
