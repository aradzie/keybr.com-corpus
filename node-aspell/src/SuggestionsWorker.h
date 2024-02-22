#include "AspellWrapper.h"
#include <napi.h>

class SuggestionsWorker : public Napi::AsyncWorker {

public:
  SuggestionsWorker(Napi::Function &callback, AspellWrapper *aspell,
                    std::string word);
  ~SuggestionsWorker();
  void Execute();
  void OnOK();

private:
  std::string word;
  AspellWrapper *aspell;
  std::vector<std::string> suggestions;
};
