import { Language } from "../lib/language.js";

const reAlphabet = /^[ابجدهوزحطيكلمنسعفصقرشتثخذضظغ]+$/;

export const ar = new Language("ar", null, (word) => {
  if (word.length > 15) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  return true;
});
