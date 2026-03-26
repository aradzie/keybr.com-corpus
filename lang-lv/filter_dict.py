import re
from pathlib import Path

from lib.filter_dict_lib import filter_dict

SCRIPT_DIR = Path(__file__).resolve().parent

filter_dict(
  input_file=SCRIPT_DIR.parent / "raw" / "dict-lv.csv.gz",
  output_file=SCRIPT_DIR / "dictionary-lv.csv",
  language_name="lv_LV",
  regexp=re.compile(r"^[aābcčdeēfgģhiījkķlļmnņoprsštuūvzž]+$"),
)
