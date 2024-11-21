import { Language } from "../lib/language.js";

const reAlphabet = /^[абвгдежзійклмнопрстуўфхцчшыьэюя]+$/u;
const reVowels = /[АЕІЙОУЎЫЭЮЯаеійоуўыэюя]/;

export const be = new Language("be", (word) => {
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
