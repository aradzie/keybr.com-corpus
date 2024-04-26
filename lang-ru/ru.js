import { Language } from "../lib/language.js";

const reAlphabet = /^[абвгдежзийклмнопрстуфхцчшщъыьэюя]+$/u;
const reVowels = /[АЕИЙОУЫЭЮЯаеийоуыэюя]/;

export const ru = new Language("ru", (word) => {
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
