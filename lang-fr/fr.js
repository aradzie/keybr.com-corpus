import dictionary from "dictionary-fr";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aàbcçdeéèfghijlmnopqrstuùvxyz]+$/;
const reVowels = /[AÀEÉÈIJOUYaàeéèijouùy]/;

export const fr = new Language("fr", dictionary, (word) => {
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
