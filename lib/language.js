export class Language {
  id;
  dictionary;
  testWord;

  constructor(id, dictionary, testWord) {
    this.id = id;
    this.dictionary = dictionary;
    this.testWord = testWord;
  }

  stem(word) {
    return word.toLocaleLowerCase(this.id);
  }
}
