export class Language {
  id;
  testWord;

  constructor(id, testWord) {
    this.id = id;
    this.testWord = testWord;
  }

  stem(word) {
    return word.toLocaleLowerCase(this.id);
  }
}
