import re
from pathlib import Path

from lib.filter_dict_lib import filter_dict

SCRIPT_DIR = Path(__file__).resolve().parent

filter_dict(
  input_file=SCRIPT_DIR.parent / "raw" / "dict-lt.csv.gz",
  output_file=SCRIPT_DIR / "dictionary-lt.csv",
  language_name="lt_LT",
  regexp=re.compile(r"^[aąbcčdeęėfghiįyjklmnoprsštuųūvzž]+$"),
)
