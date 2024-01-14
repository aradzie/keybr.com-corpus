const reAlphabet = /^[abcdefghijklmnoprstuvwxyåäö]+$/u;
const reVowels = /[AEIJOUYÅÄÖaeijouyåäö]/;

export function testWord_sv(word) {
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
