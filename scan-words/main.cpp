#include <cctype>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <unordered_map>

int main(int argc, char *argv[]) {
  std::unordered_map<std::string, int> wordCount;

  for (int i = 1; i < argc; i++) {
    char *name = argv[i];
    std::ifstream file(name);
    if (!file) {
      std::cerr << "Error opening file " << name << std::endl;
      continue;
    }
    std::cerr << "Scanning file " << name << std::endl;
    uint32_t cnt = 0;
    std::string line;
    while (std::getline(file, line)) {
      std::string word;
      for (size_t i = 0; i < line.length(); i++) {
        unsigned char ch = line[i];
        if ((ch <= 0x0020) ||           // control
            (ch >= 33 && ch <= 38) ||   // !"#$%&
            (ch >= 40 && ch <= 47) ||   // ()*+,-./
            (ch >= 58 && ch <= 64) ||   // :;<=>?@
            (ch >= 91 && ch <= 96) ||   // [\]^_`
            (ch >= 123 && ch <= 127)) { // {|}~DEL
          if (!word.empty()) {
            wordCount[word]++;
            word.clear();
          }
        } else {
          word += ch;
        }
      }
      if (!word.empty()) {
        wordCount[word]++;
      }
      cnt += 1;
      if ((cnt % 1000000) == 0) {
        std::cerr << cnt << std::endl;
      }
    }
    file.close();
  }

  for (const auto &entry : wordCount) {
    if (entry.second > 10) {
      std::cout << entry.first << "," << entry.second << std::endl;
    }
  }

  return 0;
}
