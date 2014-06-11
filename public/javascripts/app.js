var lexApp = angular.module('lexApp', [
  'ngRoute',
  'lexControllers',
  'lexServices'
  ]);

lexApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/skillsets', {
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
  }).otherwise({
    redirectTo: '/skillsets'
  });
}]);