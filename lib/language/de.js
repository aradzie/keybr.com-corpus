const reAlphabet = /^[A-ZÄÖÜ]?[a-zäöüß]+$/u;
const reVowels = /[AEIOUÄÖÜaeiouäöü]/;

export function testWord_de(word) {
  if (word.length < 2 || word.length > 20) {
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
