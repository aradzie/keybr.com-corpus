import { Language } from "../lib/language.js";

const reAlphabet = /^[aąbcčdeęėfghiįyjklmnoprsštuųūvzž]+$/;
const reVowels = /[aąeęėiįyjouųū]/;

export const lt = new Language("lt", null, (word) => {
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
