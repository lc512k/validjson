/* global requirejs */

requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../app',
    templates: '../templates',
    data: '../data',
    extras: '../extras',
    jquery: 'jquery',
    mustache: 'mustache',
    foundation: 'foundation/foundation',
    text: 'text',
    tv4: 'tv4',
    modernizr: 'modernizr',
    tooltip: 'foundation/foundation.tooltip',
    dropdown: 'foundation/foundation.dropdown',
    accordion: 'foundation/foundation.accordion'
  },
  shim: {
    'tv4': {
      deps: ['jquery'],
      exports: 'tv4'
    },
    'foundation': {
      deps: ['jquery', 'modernizr']
    },
    'modernizr': {
      deps: ['jquery']
    },
    'tooltip': {
      deps: ['jquery', 'foundation'],
      exports: 'tooltip'
    },
    'dropdown': {
      deps: ['jquery', 'foundation'],
      exports: 'dropdown'
    },
    'accordion': {
      deps: ['jquery', 'foundation'],
      exports: 'accordion'
    }
  }
});

requirejs(['app/main', 'extras/google']);
