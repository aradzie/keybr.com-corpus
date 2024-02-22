import aspell from "../node-aspell/index.js";

export class Aspell {
  static tryMake(language) {
    try {
      return new Aspell(language);
    } catch {
      console.warn(`Aspell dictionary not available for [${language.id}]`);
      return new (class {
        has(word) {
          return true;
        }
      })();
    }
  }

  #language;
  #aspell;
  #black = new Set();
  #white = new Set();

  constructor(language) {
    this.#language = language;
    this.#aspell = new aspell.SpellChecker({
      lang: language.id,
      encoding: "utf-8",
    });
  }

  has(word) {
    if (this.#black.has(word)) {
      return false;
    }
    if (this.#white.has(word)) {
      return true;
    }
    if (this.#aspell.isMisspelled(word)) {
      this.#black.add(word);
      return false;
    } else {
      this.#white.add(word);
      return true;
    }
  }
}
