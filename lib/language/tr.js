const reAlphabet = /^[abcçdefgğhIıİijklmnoöprsştuüvyz]+$/u;
const reVowels = /[AEIİJOUYaeıijoöuüy]/;

export function testWord_tr(word) {
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
