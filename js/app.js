(function () {
  'use strict';

  var data;

  data = angular.module('data', ['ngRoute','ngSanitize','ngAnimate','firebase']);

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
  data.controller('mainController', function($scope, $rootScope, $location, $sce, $firebase) {
    $scope.lang = 'spanish';
    $scope.ref = new Firebase("https://adddata.firebaseio.com/");
    $scope.content = $firebase($scope.ref);


    $scope.$on("$routeChangeSuccess", function (event, next, current) {
    });
    $scope.trust = function(str){
      if(typeof(str) === 'undefined'){
        return '';
      }
      return $sce.trustAsHtml(str.replace(/\[#]/g, "<span class='br'></span>"));
    };

  });


  data.directive('expand', function($window){
    var w;
    w = angular.element($window);
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        elem[0].style.minHeight = (w[0].innerHeight * attrs.percent   ) + "px"; //'100px';
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


  data.controller('admin', function($scope,$firebase){
    $scope.auth = function() {
      return new FirebaseSimpleLogin($scope.ref, function(error, user) {});
    };
    $scope.addPerson = function() {
      // AngularFire $add method
      $scope.people.$add($scope.newPerson);
      //or add a new person manually
      peopleRef.update({name: 'Alex', age: 35});

      $scope.newPerson = "";
    };

  });
}(this));
