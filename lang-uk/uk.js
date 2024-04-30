import { Language } from "../lib/language.js";

const reAlphabet = /^[абвгдеєжзиіїйклмнопрстуфхцчшщьюя]+$/u;
const reVowels = /[АЕЄИІЇЙОУЮЯаеєиіїйоуюя]/;

export const uk = new Language("uk", (word) => {
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
