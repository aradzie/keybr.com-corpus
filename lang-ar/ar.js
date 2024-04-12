import { Language } from "../lib/language.js";

const reAlphabet = /^[ابجدهوزحطيكلمنسعفصقرشتثخذضظغ]+$/u;

export function testWord_ar(word) {
  if (word.length > 20) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  return true;
}

export const ar = new Language("ar", testWord_ar);
