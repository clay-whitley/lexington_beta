var lexApp = angular.module('lexApp', [
  'ngRoute',
  'ngCookies',
  'lexControllers',
  'lexServices',
  'd3',
  'lexDirectives'
  ]);

lexApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/login', {
    templateUrl: 'partials/sessions/new.html',
    controller: 'SessionNewCtrl'
  }).when('/users/new', {
    templateUrl: 'partials/users/new.html',
    controller: 'UserNewCtrl'
  }).when('/skillsets', {
    templateUrl: 'partials/skillsets/index.html',
    controller: 'SkillsetIndexCtrl'
  }).when('/skillsets/new', {
    templateUrl: 'partials/skillsets/new.html',
    controller: 'SkillsetNewCtrl'
  }).when('/skillsets/:skillsetId/edit', {
    templateUrl: 'partials/skillsets/edit.html',
    controller: 'SkillsetEditCtrl'
  }).when('/skillsets/:skillsetId', {
    templateUrl: 'partials/skillsets/show.html',
    controller: 'SkillsetShowCtrl'
  }).when('/reports', {
    templateUrl: 'partials/reports/show.html',
    controller: 'ReportShowCtrl'
  }).otherwise({
    redirectTo: '/login'
  });
}]);