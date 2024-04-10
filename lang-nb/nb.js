import { Language } from "../lib/language.js";

const reAlphabet = /^[abcdefghijklmnoprstuvwxyæøå]+$/u;
const reVowels = /[AEIJOUYÆØÅaeijouyæøå]/;

export function testWord_nb(word) {
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

export const nb = new Language("nb", testWord_nb);
