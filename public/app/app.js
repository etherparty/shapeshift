'use strict';

angular.module('ethershift', [
  'ui.router',
  'ui.bootstrap'
])
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/templates/home.html'
      });
  })
  .constant('API_URL', '/api/v1');

  window.BigNumber.config({
    DECIMAL_PLACES: 8
  });
