/*global define, console*/
define([
    'jquery',
    'mustache',
    'foundation',
    'tv4',
    /*'text',*/
    'text!templates/menu.html',
    'data/menuData',
    'text!templates/changelog.html',
    'data/changelogData',
    'text!templates/roadmap.html',
    'data/roadmapData',
    'modernizr',
    'tooltip',
    'dropdown',
    'accordion'
  ],
  function($, Mustache, Foundation, tv4, menuTemplate, menuData, changelogTemplate, changelogData, roadmapTemplate, roadmapData) {
    'use strict';
    console.log('$', $);
    console.log('Mustache', Mustache);
    console.log('Foundation', Foundation);
    console.log('tv4', tv4);
    console.log('menuTemplate', menuTemplate);
    console.log('menuData', menuData);
    console.log('changelogTemplate', changelogTemplate);
    console.log('changelogData', changelogData);
    console.log('roadmapTemplate', roadmapTemplate);
    console.log('roadmapData', roadmapData);
    var $schemaErrors, $schemaTextarea, $jsonErrors, $jsonTextarea, $success, $error, $validationErrorMsg, $validationSuccessMsg, $anyTextarea,
      $exampleButton, $reformatters, reformatterJSON, reformatterSchema, loadTemplates, bindEvents, init,
      $schemaMenu, $jsonMenu, $changelog, $roadmap;

    $schemaErrors = $('#schemaErrors');
    $schemaTextarea = $('#schema');

    $jsonErrors = $('#jsonErrors');
    $jsonTextarea = $('#json');

    $success = $('#success');
    $error = $('#error');
    $validationErrorMsg = $('#errorMsg');
    $validationSuccessMsg = $('#successMsg');

    $anyTextarea = $('textarea');
    $exampleButton = $('#example');

    $schemaMenu = $('.js-schema-drop');
    $jsonMenu = $('.js-json-drop');

    $changelog = $('.js-changelog');
    $roadmap = $('.js-roadmap');

    loadTemplates = function() {
      var menuHTML, roadmapHTML, changelogHTML;
      Mustache.parse(menuTemplate);
      Mustache.parse(roadmapTemplate);
      Mustache.parse(changelogTemplate);

      console.info(menuData);
      console.info(roadmapData);
      console.info(changelogData);

      menuHTML = Mustache.render(menuTemplate, menuData);
      $schemaMenu.append(menuHTML);
      $jsonMenu.append(menuHTML);

      $reformatters = $('.js-reformat');
      console.log('$reformatters', $reformatters);

      roadmapHTML = Mustache.render(roadmapTemplate, roadmapData);
      $roadmap.append(roadmapHTML);

      changelogHTML = Mustache.render(changelogTemplate, changelogData);
      $changelog.append(changelogHTML);
    };

    bindEvents = function() {
      $anyTextarea.on('keyup', function(event) {
        console.log('keyup@');
        var currentTextarea, result, schemaErrors, jsonErrors, $this, $errorMsg, $successMsg;
        $this = $(this);
        $errorMsg = $this.parent().find('.js-error-msg');
        $successMsg = $this.parent().find('.js-success-msg');

        currentTextarea = event.currentTarget.id;

        if ($this.val()) {
          try {
            window[currentTextarea] = jQuery.parseJSON($this.val());
            $errorMsg.hide().html('');
            $successMsg.show().html('This ' + currentTextarea + ' is well formatted');
          } catch (error) {
            $successMsg.hide().html('');
            $errorMsg.show().html(error);
          }
        } else {
          $successMsg.hide();
          $errorMsg.hide();
        }

        jsonErrors = ($jsonErrors.html()).length > 0;
        schemaErrors = ($schemaErrors.html()).length > 0;

        if ($this.val().length > 0 && !jsonErrors && !schemaErrors) {
          console.log('tv4@', tv4);
          try {
            result = tv4.validate(window.json, window.schema);
            console.log('result@', result, tv4);
            if (result === true) {
              $success.show();
              $validationSuccessMsg.html('Your JSON is valid against your schema');
              $error.hide();
            } else {
              var where = tv4.error.dataPath ? ' in ' + tv4.error.dataPath : '';
              $error.show();
              $validationErrorMsg.html(tv4.error.message + where);
              $success.hide();
            }
          } catch (error) {
            / /
            console.warn(error);
          }
        } else {
          $success.hide();
          $error.hide();
        }
      });

      $anyTextarea.on('focusout', function( /*e*/ ) {
        var $this, escapeChar;
        escapeChar = '  ';
        $this = $(this);
        try {
          if ($this.prop('id') === 'schema' && reformatterSchema !== undefined) {
            escapeChar = reformatterSchema;
          } else if ($this.prop('id') === 'json' && reformatterJSON !== undefined) {
            escapeChar = reformatterJSON;
          }
          $this.val(JSON.stringify(JSON.parse($(this).val()), null, escapeChar));
        } catch (error) {
          //not a valid JSON typed in yet
          //console.warn(error);
        }
      });

      $reformatters.on('click', function(e) {
        var $linkedTextarea, escapeChar, action, target, $thisTick, $allTicks;
        console.log('target', e.currentTarget);
        //console.warn($(this), e.currentTarget, $(e.currentTarget).parents('.js-box'));
        $linkedTextarea = $(this).parents('.js-box').find('textarea');
        $thisTick = $(this).find('.fi-check');
        $allTicks = $(this).parent().parent().find('.fi-check');

        $allTicks.hide();
        $thisTick.show();

        target = $linkedTextarea;
        action = $(e.currentTarget).attr('action');

        switch (action) {
          case 'compact':
            escapeChar = null;
            break;
          case 'tabs':
            escapeChar = '\t';
            break;
          case 'two':
            escapeChar = '  ';
            break;
          case 'four':
            escapeChar = '    ';
            break;
        }
        try {
          $linkedTextarea.val(JSON.stringify(JSON.parse($($linkedTextarea).val()), null, escapeChar));
        } catch (error) {
          //not a valid JSON typed in yet
        }

        if ($linkedTextarea.prop('id') === 'schema') {
          reformatterSchema = escapeChar;
        } else {
          reformatterJSON = escapeChar;
        }
      });

      //TODO move out - make fcn that generates random example
      $exampleButton.on('click', function() {
        $schemaTextarea.val('{"title": "Example Schema","type": "object","properties": {"firstName": {"type": "string"},"lastName": {"type": "string"},"age": {"description": "Age in years","type": "integer","minimum": 0}},"required": ["firstName","lastName"] }');
        $jsonTextarea.val('{"firstName": "Jason","lastName": "Smith","age": 22}');
        $anyTextarea.trigger('keyup');
        $anyTextarea.trigger('focusout');
        //TODO refactor into "prettify" function
        /*        $jsonTextarea.val(JSON.stringify(JSON.parse($jsonTextarea.val()), null, '  '));
        $schemaTextarea.val(JSON.stringify(JSON.parse($schemaTextarea.val()), null, '  '));*/

      });
    };

    init = function() {
      //Init foundation!
      $(document).foundation();
      loadTemplates();
      bindEvents();
    };
    init();
  });
