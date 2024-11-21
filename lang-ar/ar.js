import { Language } from "../lib/language.js";

const reAlphabet = /^[ابجدهوزحطيكلمنسعفصقرشتثخذضظغ]+$/u;

export const ar = new Language("ar", (word) => {
  if (word.length > 15) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  return true;
});
