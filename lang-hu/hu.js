import dictionary from "dictionary-hu";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz]+$/;
const reVowels = /[AÁEÉIÍJOÓÖŐUÚÜŰaáeéiíjoóöőuúüű]/;

export const hu = new Language("hu", dictionary, (word) => {
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
