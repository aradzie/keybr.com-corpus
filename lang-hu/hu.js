import { Language } from "../lib/language.js";

const reAlphabet = /^[aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz]+$/u;
const reVowels = /[AÁEÉIÍJOÓÖŐUÚÜŰaáeéiíjoóöőuúüű]/;

export const hu = new Language("hu", (word) => {
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
