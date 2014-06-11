var lexControllers = angular.module('lexControllers', []);

lexControllers.controller('SkillsetIndexCtrl', ['$scope', 'Skillset', function($scope, Skillset){
  $scope.skillsets = Skillset.query();

  $scope.delete = function(doc){
    Skillset.delete({skillsetId: doc._id});
  };
}]);

lexControllers.controller('SkillsetShowCtrl', ['$scope', '$routeParams', 'Skillset', function($scope, $routeParams, Skillset){
  $scope.skillset = Skillset.get({skillsetId: $routeParams.skillsetId});
}]);

lexControllers.controller('SkillsetNewCtrl', ['$scope', 'Skillset', function($scope, Skillset){
  $scope.create = function(skillset){
    Skillset.save({}, skillset);
  };
}]);