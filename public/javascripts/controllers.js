var lexControllers = angular.module('lexControllers', []);

lexControllers.controller('SkillsetIndexCtrl', ['$scope', function($scope){
  $scope.skillsets = ["Lorem", "Ipsum"];
}]);

lexControllers.controller('SkillsetShowCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
  $scope.skillset = $routeParams.skillsetId;
}]);