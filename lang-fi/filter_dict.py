import csv
import gzip
import re
import unicodedata
from pathlib import Path
from re import Pattern

from libvoikko import Voikko

SCRIPT_DIR = Path(__file__).resolve().parent
INPUT_FILE = SCRIPT_DIR.parent / "raw" / "dict-fi.csv.gz"
OUTPUT_FILE = SCRIPT_DIR / "dictionary-fi.csv"
FINNISH_WORD_RE = re.compile(r"^[abdefghijklmnoprstuvyäö]+$")


def create_voikko(
  variant: str = "fi",
  dictionary_path: Path | None = None,
) -> Voikko:
  path_value = None if dictionary_path is None else str(dictionary_path)

  try:
    if path_value is None:
      return Voikko(variant)
    return Voikko(variant, path=path_value)
  except TypeError:
    voikko = Voikko()
    try:
      if path_value is None:
        voikko.init(variant=variant)
      else:
        voikko.init(path=path_value, variant=variant)
    except Exception:
      voikko.terminate()
      raise
    return voikko


def normalize_word(word: str) -> str:
  return unicodedata.normalize("NFC", word.strip().lower())


def is_valid_word(voikko: Voikko, word_regexp: Pattern[str], word: str) -> bool:
  if word_regexp.fullmatch(word) is None:
    return False
  return bool(voikko.spell(word))


def iter_rows(path: Path):
  with gzip.open(path, "rt", encoding="utf-8", newline="") as handle:
    yield from csv.reader(handle)


def filter_dict(
  input_file: Path,
  output_file: Path,
) -> None:
  voikko = create_voikko()

  total_rows = 0
  kept_rows = 0
  dropped_rows = 0
  malformed_rows = 0

  output_file.parent.mkdir(parents=True, exist_ok=True)

  try:
    with output_file.open("w", encoding="utf-8", newline="") as out_handle:
      writer = csv.writer(out_handle)

      for row in iter_rows(input_file):
        if kept_rows >= 30_000:
          break

        total_rows += 1

        if len(row) != 2:
          malformed_rows += 1
          continue

        word = normalize_word(row[0])
        count = row[1].strip()
        if not word or not count:
          malformed_rows += 1
          continue

        if is_valid_word(voikko, FINNISH_WORD_RE, word):
          writer.writerow((word, count))
          kept_rows += 1
        else:
          dropped_rows += 1
  finally:
    voikko.terminate()

  print(
    f"Finished {input_file} -> {output_file}. "
    f"Processed {total_rows:,} rows; kept {kept_rows:,}, "
    f"dropped {dropped_rows:,}, malformed {malformed_rows:,}.",
  )


filter_dict(
  input_file=INPUT_FILE,
  output_file=OUTPUT_FILE,
)
