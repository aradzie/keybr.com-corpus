#include "IsMisspelledWorker.h"

IsMisspelledWorker::IsMisspelledWorker(Napi::Function &callback,
                                       AspellWrapper *aspell, std::string word)
    : AsyncWorker(callback) {
  this->aspell = aspell;
  this->word = word;
}

IsMisspelledWorker::~IsMisspelledWorker() {}

void IsMisspelledWorker::Execute() {
  this->misspelled = this->aspell->isMisspelled(this->word);
}

void IsMisspelledWorker::OnOK() {
  Napi::HandleScope scope(Env());
  Callback().Call({Env().Null(), Napi::Boolean::New(Env(), this->misspelled)});
}
