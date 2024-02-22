#include "AspellWrapper.h"
#include <napi.h>

class SpellChecker : public Napi::ObjectWrap<SpellChecker> {

public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  SpellChecker(const Napi::CallbackInfo &info);
  ~SpellChecker();

private:
  AspellWrapper *aspell;
  static Napi::FunctionReference constructor;
  Napi::Value isMisspelled(const Napi::CallbackInfo &info);
  Napi::Value isMisspelledAsync(const Napi::CallbackInfo &info);
  Napi::Value getCorrectionsForMisspelling(const Napi::CallbackInfo &info);
  Napi::Value getCorrectionsForMisspellingAsync(const Napi::CallbackInfo &info);
};
