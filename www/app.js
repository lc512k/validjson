/* global requirejs */

requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../app',
    templates: '../templates',
    data: '../data',
    jquery: 'jquery',
    mustache: 'mustache',
    foundation: 'foundation',
    text: 'text',
    tv4: 'tv4',
    modernizr: 'vendor/custom.modernizr',
    tooltip: 'foundation/foundation.tooltip',
    dropdown: 'foundation/foundation.dropdown',
    accordion: 'foundation/foundation.accordion'
  },
  shim: {
    'tv4': {
      deps: ['jquery'],
      exports: 'tv4'
    },
    'modernizr': {
      deps: ['jquery']
    },
    'foundation': {
      deps: ['jquery', 'modernizr']
    },
    'tooltip': {
      deps: ['jquery', 'foundation/foundation'],
      exports: 'tooltip'
    },
    'dropdown': {
      deps: ['jquery', 'foundation/foundation'],
      exports: 'dropdown'
    },
    'accordion': {
      deps: ['jquery', 'foundation/foundation'],
      exports: 'accordion'
    }
  }
});

// Start the main app logic.
requirejs(['app/main']);
