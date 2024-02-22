{
  "targets": [{
    "target_name": "aspell",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
          "src/main.cpp",
          "src/AspellWrapper.cpp",
          "src/SpellChecker.cpp",
          "src/IsMisspelledWorker.cpp",
          "src/SuggestionsWorker.cpp"
      ],
      'include_dirs': [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'libraries': ["-laspell"],
      'dependencies': [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
  }]
}
