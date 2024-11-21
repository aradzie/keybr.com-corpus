import { Language } from "../lib/language.js";

const reAlphabet = /^[abcdefghijklmnopqrstuvwxyz]+$/u;
const reVowels = /[AEIJOUYaeijouy]/;

export const it = new Language("it", (word) => {
  if (word.length > 15) {
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
