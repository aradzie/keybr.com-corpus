class MultiEntry {
  #stem;
  #forms;

  constructor(stem) {
    this.#stem = stem;
    this.#forms = new Map();
  }

  add(word) {
    this.#forms.set(word, (this.#forms.get(word) ?? 0) + 1);
  }

  best() {
    let word = "";
    let count = 0;
    let sum = 0;
    for (const [word0, count0] of this.#forms) {
      if (count0 > count) {
        word = word0;
        count = count0;
      }
      sum += count0;
    }
    return [word, sum];
  }
}

export class MultiDict {
  #language;
  #entries;
  #count;

  constructor(language) {
    this.#language = language;
    this.#entries = new Map();
    this.#count = 0;
  }

  get language() {
    return this.#language;
  }

  add(word) {
    const stem = word.toLowerCase();
    let entry = this.#entries.get(stem);
    if (entry == null) {
      this.#entries.set(stem, (entry = new MultiEntry(stem)));
    }
    entry.add(word);
    this.#count += 1;
  }

  build() {
    const dict = [];
    for (const entry of this.#entries.values()) {
      const [word, count] = entry.best();
      dict.push([word, Math.round(count * (1e6 / this.#count))]);
    }
    return dict;
  }
}

export class Dict {
  #language;
  #entries;
  #count;

  constructor(language) {
    this.#language = language;
    this.#entries = new Map();
    this.#count = 0;
  }

  get language() {
    return this.#language;
  }

  add(word) {
    const stem = this.#language.stem(word);
    this.#entries.set(stem, (this.#entries.get(stem) ?? 0) + 1);
    this.#count += 1;
  }

  build() {
    const dict = [];
    for (const [word, count] of this.#entries) {
      dict.push([word, Math.round(count * (1e6 / this.#count))]);
    }
    return dict;
  }
}

export function sortByWord(dict) {
  return [...dict].sort((a, b) => compareStrings(a[0], b[0]));
}

export function sortByCount(dict) {
  return [...dict].sort((a, b) => b[1] - a[1] || compareStrings(a[0], b[0]));
}

function compareStrings(a, b) {
  if (a > b) {
    return +1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}
