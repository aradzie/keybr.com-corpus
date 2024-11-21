#!/usr/bin/env bash

meson setup build
meson compile -C build

./build/scan /mnt/userdata/corpus/books_large*.txt > dict-en-books.csv
./build/scan /mnt/userdata/corpus/enwiki-20220201-clean.txt > dict-en-wiki.csv
./build/scan /mnt/userdata/corpus/1-billion-word-language-modeling-benchmark-r13output/**/* > dict-en-news.csv
