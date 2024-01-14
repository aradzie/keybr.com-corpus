const reAlphabet = /^[aábcčdďeéěfghiíjklmnňoóprřsštťuúůvxyýzž]+$/u;
const reVowels = /[AÁEÉĚIÍJOÓUÚŮYÝaáeéěiíjoóuúůyý]/;

export function testWord_cs(word) {
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
