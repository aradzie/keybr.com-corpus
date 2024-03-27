import { testWord_be } from "./language/be.js";
import { testWord_cs } from "./language/cs.js";
import { testWord_de } from "./language/de.js";
import { testWord_el } from "./language/el.js";
import { testWord_en } from "./language/en.js";
import { testWord_es } from "./language/es.js";
import { testWord_fr } from "./language/fr.js";
import { testWord_it } from "./language/it.js";
import { testWord_nb } from "./language/nb.js";
import { testWord_nl } from "./language/nl.js";
import { testWord_pl } from "./language/pl.js";
import { testWord_ru } from "./language/ru.js";
import { testWord_sl } from "./language/sl.js";
import { testWord_sv } from "./language/sv.js";
import { testWord_uk } from "./language/uk.js";

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

export const be = new Language("be", testWord_be);
export const cs = new Language("cs", testWord_cs);
export const de = new Language("de", testWord_de);
export const el = new Language("el", testWord_el);
export const en = new Language("en", testWord_en);
export const es = new Language("es", testWord_es);
export const fr = new Language("fr", testWord_fr);
export const it = new Language("it", testWord_it);
export const nb = new Language("nb", testWord_nb);
export const nl = new Language("nl", testWord_nl);
export const pl = new Language("pl", testWord_pl);
export const ru = new Language("ru", testWord_ru);
export const sl = new Language("sl", testWord_sl);
export const sv = new Language("sv", testWord_sv);
export const uk = new Language("uk", testWord_uk);

export const languages = [
  be,
  cs,
  de,
  el,
  en,
  es,
  fr,
  it,
  nb,
  nl,
  pl,
  ru,
  sl,
  sv,
  uk,
];
