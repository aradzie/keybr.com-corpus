import { Language } from "../lib/language.js";

const reAlphabet = /^[abcdefghijklmnoprstuvzčćžđš]+$/;
const reVowels = /[AEIOUaeiou]/;

export function testWord_hr(word) {
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
}

export const hr = new Language("hr", testWord_hr);
