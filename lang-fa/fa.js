import { Language } from "../lib/language.js";

const reAlphabet = /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/u;

export function testWord_fa(word) {
  if (word.length > 20) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  return true;
}

export const fa = new Language("fa", testWord_fa);
