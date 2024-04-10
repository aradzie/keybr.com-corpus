const reAlphabet = /^[aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz]+$/u;
const reVowels = /[AÁEÉIÍJOÓÖŐUÚÜŰaáeéiíjoóöőuúüű]/;

export function testWord_hu(word) {
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