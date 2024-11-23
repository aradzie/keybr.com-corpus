import morfeusz2
import pyuca

morfeusz = morfeusz2.Morfeusz()
collator = pyuca.Collator()

for file_name in ["blacklist-profanity.txt", "blacklist-sensitive.txt"]:
  with open(file_name, "r") as file:
    lines = file.readlines()

  word_list = set()
  for line in lines:
    word = line.strip()
    word_list.add(word)
    for (variant, _, _, _, _) in morfeusz.generate(word):
      word_list.add(variant)

  with open(file_name, "w") as file:
    file.write("\n".join(sorted(word_list, key=collator.sort_key)) + "\n")
