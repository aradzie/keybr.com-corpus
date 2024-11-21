class MultiEntry {
  #stem;
  #forms;

  constructor(stem) {
    this.#stem = stem;
    this.#forms = new Map();
  }

  add(word, count = 1) {
    this.#forms.set(word, (this.#forms.get(word) ?? 0) + count);
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

  constructor(language) {
    this.#language = language;
    this.#entries = new Map();
  }

  get language() {
    return this.#language;
  }

  add(word, count = 1) {
    const stem = word.toLowerCase();
    let entry = this.#entries.get(stem);
    if (entry == null) {
      this.#entries.set(stem, (entry = new MultiEntry(stem)));
    }
    entry.add(word, count);
  }

  build() {
    const dict = [];
    let total = 1;
    for (const entry of this.#entries.values()) {
      const [word, count] = entry.best();
      total += count;
    }
    for (const entry of this.#entries.values()) {
      const [word, count] = entry.best();
      dict.push([word, round(count * (1e6 / total))]);
    }
    return dict;
  }
}

export class Dict {
  #language;
  #entries;

  constructor(language) {
    this.#language = language;
    this.#entries = new Map();
  }

  get language() {
    return this.#language;
  }

  add(word, count = 1) {
    const stem = this.#language.stem(word);
    this.#entries.set(stem, (this.#entries.get(stem) ?? 0) + count);
  }

  build() {
    const dict = [];
    let total = 1;
    for (const [word, count] of this.#entries) {
      total += count;
    }
    for (const [word, count] of this.#entries) {
      dict.push([word, round(count * (1e6 / total))]);
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

function round(v) {
  return Math.round(v * 1000) / 1000;
}
