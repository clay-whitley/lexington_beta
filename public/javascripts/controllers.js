var lexControllers = angular.module('lexControllers', []);

lexControllers.controller('SkillsetIndexCtrl', ['$scope', 'Skillset', function($scope, Skillset){
  $scope.skillsets = Skillset.query();
}]);

lexControllers.controller('SkillsetShowCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
  $scope.skillset = $routeParams.skillsetId;
}]);

lexControllers.controller('SkillsetNewCtrl', ['$scope', function($scope){
  $scope.create = function(skillset){
    console.log(skillset);
  };
}]);