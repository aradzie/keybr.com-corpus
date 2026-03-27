import re
from pathlib import Path

import enchant

from lib.filter_dict_lib import filter_dict

SCRIPT_DIR = Path(__file__).resolve().parent
WORD_RE = re.compile(r"^[aąbcčdeęėfghiįyjklmnoprsštuųūvzž]+$")
SPELL_DICTIONARY = enchant.Dict("lt_LT")


def is_valid_word(word: str) -> bool:
  if WORD_RE.fullmatch(word) is None:
    return False
  return SPELL_DICTIONARY.check(word)


filter_dict(
  input_file=SCRIPT_DIR.parent / "raw" / "dict-lt.csv.gz",
  output_file=SCRIPT_DIR / "dictionary-lt-spellchecked.csv",
  is_valid_word=is_valid_word,
)
