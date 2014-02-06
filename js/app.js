(function () {
  'use strict';

  var data;

  data = angular.module('data', ['ngRoute','ngSanitize','ngAnimate']);

  // configure our routes
  data.config(function($routeProvider, $locationProvider) {
    $routeProvider
    // route for the home page
    .when('/', {
      templateUrl : 'pages/home.html',
      controller  : 'homeController'
    })
    .otherwise({redirectTo: '/'});
  });


  // create the controller and inject Angular's $scope
  data.controller('mainController', function($scope, $rootScope, $location, $sce) {
    $scope.showBanner = function(){
      $scope.current = $location.path();
      $scope.banner = false;
      if( $location.path() === '/'){
        $scope.current = 'home';
        $scope.banner = 'true';
      }
      return;
    };

    $scope.$on("$routeChangeSuccess", function (event, next, current) {
      $scope.showBanner();
    });
    $scope.trust = function(str){
      return $sce.trustAsHtml(str);
    };

  });


  data.directive('expand', function($window){
    var w;
    w = angular.element($window);
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        elem[0].style.height = (w[0].innerHeight * attrs.percent   ) + "px"; //'100px';
      }
    };
  });

  data.directive('scrollto', function(){
    return {
      restrict: 'A',
      link: function(scope, elem, attrs){
        $(elem).on('click', function(){
          $.scrollTo('#' + attrs.scrollto, 800, {queue:true});
          return;
        });
        return;
      }
    };
  });


  data.directive('resize', function ($window) {
    console.log($window);return;
    var w;
    return function (scope, element) {
      w = angular.element($window);
      scope.getWindowDimensions = function () {
        return { 'h': w.height(), 'w': w.width() };
      };
      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;
        scope.style = function () {
          return {
            'height': (newValue.h - 100) + 'px',
            'width': (newValue.w - 100) + 'px'
          };
        };
      }, true);
      w.bind('resize', function () {
        scope.$apply();
      });
    };
  });

}(this));
