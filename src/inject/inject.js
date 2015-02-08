(function ($, chrome) {
  chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        // ----------------------------------------------------------
        // This part of the script triggers when page is done loading
        console.log($.fn.jquery, "Hello again. This message was sent from wunderpal");
        // ----------------------------------------------------------

        // Base app module definition.
        angular.module('wunderpal', [
          /*
           * Angular modules
           */
          'ngAnimate',
          'ngMessages',
          'ngMaterial',

          /*
           * 3rd Party modules
           */

          'ui.router',
          'ngMdIcons'
        ]);

        var $body = $('body'),
          $toolbar = $('<section class="wunderpal-toolbar" ui-view="toolbar"/>'),
          $sidebar = $('<aside class="wunderpal-sidebar" ui-view="sidebar"/>'),
          toolbarTpl = '<md-toolbar class="" layout="row" layout-align="center center">\
                          <h1 flex class="md-toolbar-tools">WunderPal</h1>\
                          <ng-md-icon size="32" icon="menu" ng-click="toolbar.toggleSidebar();"></ng-md-icon>\
                      </md-toolbar>',
          sidebarTpl = '<md-toolbar class="" layout="row" layout-align="center center">\
                          <h1 flex class="md-toolbar-tools">Add a note</h1>\
                          <ng-md-icon size="32" icon="chevron_right" ng-click="toolbar.toggleSidebar();"></ng-md-icon>\
                        </md-toolbar>\
                        <md-content class="md-padding">\
                          <md-input-container flex>\
                            <label>Note title</label>\
                            <input ng-model="sidebar.title">\
                          </md-input-container>\
                          <md-input-container flex>\
                            <label>Note</label>\
                            <textarea ng-model="sidebar.note" columns="1" md-maxlength="150"></textarea>\
                          </md-input-container>\
                        </md-content>';

        // Prepare page markup.
        $body.prepend($toolbar);
        $body.append($sidebar);


        // Attach app module to document.
        angular.element(document).ready(function() {
          angular.bootstrap(document, ['wunderpal']);
        });

        // Configuration, routes.
        angular.module('wunderpal')
          .config(configure);

        configure.$inject = [
          '$stateProvider',
          '$urlRouterProvider'
        ];

        /* @ngInject */
        function configure($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/');
          $stateProvider
            .state('home', {
              url: '/',
              views: {
                toolbar: {
                  template: toolbarTpl,
                  controller: 'ToolbarController',
                  controllerAs: 'toolbar'
                },
                sidebar: {
                  template: sidebarTpl,
                  controller: 'SidebarController',
                  controllerAs: 'sidebar'
                }
              }

            });
        }

        // Controller for toolbar.
        angular.module('wunderpal')
          .controller('ToolbarController', ToolbarController);

        function ToolbarController() {
          var vm = this;
          vm.toggleSidebar = toggleSidebar;

          function toggleSidebar() {
            console.log('toggle');
            $('body').toggleClass('has-sidebar');

            $('.wunderpal-sidebar').toggleClass('is-open');
          }
        }
        // Controller for toolbar.
        angular.module('wunderpal')
          .controller('SidebarController', SidebarController);

        function SidebarController() {
          var vm = this;

        }
        // End inject code.
      }
    }, 10);
  });

})(jQuery, chrome);
