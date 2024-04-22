import { Language } from "../lib/language.js";

const reAlphabet = /^[aáâãàbcçdeéêfghiíjlmnoóôõpqrstuúvxz]+$/u;
const reVowels = /[AÁÂÃÀEÉÊIÍJOÓÔÕUÚaáâãàeéêiíjoóôõuú]/;

export function testWord_pt(word) {
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

export const ptPT = new Language("pt-PT", testWord_pt);
export const ptBR = new Language("pt-BR", testWord_pt);
