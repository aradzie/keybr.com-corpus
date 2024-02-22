#include "AspellWrapper.h"
#include <napi.h>

class IsMisspelledWorker : public Napi::AsyncWorker {

public:
  IsMisspelledWorker(Napi::Function &callback, AspellWrapper *aspell,
                     std::string word);
  ~IsMisspelledWorker();
  void Execute();
  void OnOK();

private:
  std::string word;
  AspellWrapper *aspell;
  bool misspelled;
};
