import NSpell from "nspell";

export class SpellChecker {
  #language;
  #nspell;
  #white = new Set();
  #black = new Set();

  constructor(language) {
    this.#language = language;
    const { dictionary } = language;
    if (dictionary != null) {
      this.#nspell = new NSpell(dictionary);
    } else {
      this.#nspell = { correct: () => true };
    }
  }

  has(word) {
    if (this.#white.has(word)) {
      return true;
    }
    if (this.#black.has(word)) {
      return false;
    }
    if (this.#nspell.correct(word)) {
      this.#white.add(word);
      return true;
    } else {
      this.#black.add(word);
      return false;
    }
  }
}
