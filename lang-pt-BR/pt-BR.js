import dictionary from "dictionary-pt";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aáâãàbcçdeéêfghiíjlmnoóôõpqrstuúvxz]+$/;
const reVowels = /[AÁÂÃÀEÉÊIÍJOÓÔÕUÚaáâãàeéêiíjoóôõuú]/;

const testWord = (word) => {
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
};

export const pt_BR = new Language("pt-BR", dictionary, testWord);
