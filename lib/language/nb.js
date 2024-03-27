const reAlphabet = /^[abcdefghijklmnoprstuvwxyæøå]+$/u;
const reVowels = /[AEIJOUYÆØÅaeijouyæøå]/;

export function testWord_nb(word) {
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
