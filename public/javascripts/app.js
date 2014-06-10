var lexApp = angular.module('lexApp', [
  'ngRoute',
  'lexControllers'
  ]);

lexApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/skillsets', {
    templateUrl: 'partials/skillsets/index.html',
    controller: 'SkillsetIndexCtrl'
  }).when('/skillsets/:skillsetId', {
    templateUrl: 'partials/skillsets/show.html',
    controller: 'SkillsetShowCtrl'
  }).otherwise({
    redirectTo: '/skillsets'
  });
}]);