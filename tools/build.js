// WORKS - FULL PROJECT
// {
//   'appDir': '../www',
//   'baseUrl': 'lib',
//   'paths': {
//     'app': '../app',
//     'data': '../data',
//     'templates': '../templates'
//   },
//   'dir': '../www-built',
//   'modules': [{
//     'name': 'app'
//   }]
// }

//WORKS - SINGLE FILE JS and HTML only // HALF-WORKS WITHOUT TV4, WITH PATHS
// {
//   'baseUrl': '../www/lib',
//   'paths': {
//     'app': '../app',
//     'data': '../data',
//     'templates': '../templates'
//   },
//   'name': 'app',
//   'out': '../www/app-built.js'
// }

//JUST WORKS!
({
  baseUrl: '../www/lib',
  name: 'app',
  out: '../www/app-built.js',
  mainConfigFile: '../www/app.js',
  findNestedDependencies: true
})
