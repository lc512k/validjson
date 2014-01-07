//\Users\laura.carvajal\Documents\Sites>node r.js -o validjson.com\js\config.js

({
  baseUrl: ".",
  name: "app",
  out: "app-built.js",
  removeCombined: true,
  mainConfigFile: "app.js",
  //stubModules: ['text'],
  findNestedDependencies: true
})

// ({
//   mainConfigFile: "js/app.js",
//   baseUrl: "js",
//   name: "app",
//   out: "dist/app.js",
//   removeCombined: true,
//   findNestedDependencies: true
// })
