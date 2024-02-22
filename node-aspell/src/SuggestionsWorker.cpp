#include "SuggestionsWorker.h"

SuggestionsWorker::SuggestionsWorker(Napi::Function &callback,
                                     AspellWrapper *aspell, std::string word)
    : AsyncWorker(callback) {
  this->aspell = aspell;
  this->word = word;
}

SuggestionsWorker::~SuggestionsWorker() {}

void SuggestionsWorker::Execute() {
  this->suggestions = this->aspell->getCorrectionsForMisspelling(this->word);
}

void SuggestionsWorker::OnOK() {
  Napi::Env env = Env();
  Napi::HandleScope scope(env);

  Napi::Array results = Napi::Array::New(env, this->suggestions.size());
  int i = 0;
  for (auto iter = this->suggestions.begin(); iter != this->suggestions.end();
       ++iter) {
    results[i++] = Napi::String::New(env, *iter);
  }
  suggestions.clear();
  Callback().Call({env.Null(), results});
}
