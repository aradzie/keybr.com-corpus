const reAlphabet = /^[aábcdeéfghiíjlmnñoópqrstuúüvxyz]+$/u;
const reVowels = /[AÁEÉIÍJOÓUÚÜYaáeéiíjoóuúüy]/;

export function testWord_es(word) {
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
