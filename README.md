# keybr.com-corpus

Scripts and data for building curated word-frequency dictionaries used by
`keybr.com`.

The repository combines:

- raw frequency lists in `raw/`
- per-language rules in `lang-*/`
- shared import/parsing helpers in `lib/`
- shared blacklist sources in `blacklist/`

The output of most workflows is a `lang-*/dictionary-*.csv` file containing
words with normalized frequency scores in parts per million.

## Goals

The dictionaries in this repository are intended to prefer:

- common everyday language
- broad, topic-neutral vocabulary
- words suitable for typing practice

The filtering process tries to remove:

- profanity and sensitive terms
- names, brands, and locations
- malformed tokens and non-words
- language bleed from English or other languages

Some lists are also reviewed manually by native speakers.
