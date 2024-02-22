#include "AspellWrapper.h"

// Initialize aspell objects
// http://aspell.net/man-html/The-Options.html
AspellWrapper::AspellWrapper(const std::map<std::string, std::string> options) {
  this->aspellConfig = new_aspell_config();
  // Set each option in the options map
  for (auto &option : options) {
    aspell_config_replace(this->aspellConfig, option.first.c_str(),
                          option.second.c_str());
  }
  AspellCanHaveError *possibleError = new_aspell_speller(this->aspellConfig);
  if (aspell_error_number(possibleError) != 0) {
    delete_aspell_config(this->aspellConfig);
    throw std::runtime_error(aspell_error_message(possibleError));
  } else {
    this->spellChecker = to_aspell_speller(possibleError);
  }
}

// Free memory used by aspell
AspellWrapper::~AspellWrapper() {
  if (this->spellChecker != NULL) {
    delete_aspell_speller(this->spellChecker);
    this->spellChecker = NULL;
  }
  if (this->aspellConfig != NULL) {
    delete_aspell_config(this->aspellConfig);
    this->aspellConfig = NULL;
  }
}

// Returns true if the word is misspelled
bool AspellWrapper::isMisspelled(const std::string word) {
  // TODO: see if lock can be removed in async case by creating multiple
  // spellChecker instances
  std::lock_guard<std::mutex> lock(this->misspelledLock);
  return aspell_speller_check(this->spellChecker, word.c_str(), -1) != 1;
}

// Returns a list of suggestions for a misspelled word
std::vector<std::string>
AspellWrapper::getCorrectionsForMisspelling(const std::string word) {
  // Need a lock for aspell_speller_suggest because:
  // "The word list returned by suggest is only valid until the next call to
  // suggest."
  std::lock_guard<std::mutex> lock(this->correctionsLock);
  const AspellWordList *suggestions =
      aspell_speller_suggest(this->spellChecker, word.c_str(), -1);
  AspellStringEnumeration *elements = aspell_word_list_elements(suggestions);
  const char *suggestion;
  std::vector<std::string> results;
  while ((suggestion = aspell_string_enumeration_next(elements)) != NULL) {
    results.push_back(std::string(suggestion));
  }
  delete_aspell_string_enumeration(elements);
  return results;
}
