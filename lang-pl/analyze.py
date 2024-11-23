import morfeusz2

morfeusz = morfeusz2.Morfeusz()


def is_name(word):
  for (_, _, (_, _, _, arr, _)) in morfeusz.analyse(word):
    if ('nazwisko' in arr or 'imię' in arr or 'nazwa_geograficzna' in arr):
      return True
  return False


with open("dictionary-pl.csv", "r") as file:
  lines = file.readlines()

for line in lines:
  word = line.strip().split(",")[0]
  if is_name(word):
    print(word)
