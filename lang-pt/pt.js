import { Language } from "../lib/language.js";

const reAlphabet = /^[aáâãàbcçdeéêfghiíjlmnoóôõpqrstuúvxz]+$/u;
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

export const ptPT = new Language("pt-PT", testWord);
export const ptBR = new Language("pt-BR", testWord);
