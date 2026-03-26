import re
from pathlib import Path

from libvoikko import Voikko

from lib.filter_dict_lib import filter_dict

SCRIPT_DIR = Path(__file__).resolve().parent
WORD_RE = re.compile(r"^[abdefghijklmnoprstuvyäö]+$")
VOIKKO = Voikko("fi")


def is_valid_word(word: str) -> bool:
  if WORD_RE.fullmatch(word) is None:
    return False
  return VOIKKO.spell(word)


filter_dict(
  input_file=SCRIPT_DIR.parent / "raw" / "dict-fi.csv.gz",
  output_file=SCRIPT_DIR / "dictionary-fi.csv",
  is_valid_word=is_valid_word,
)
