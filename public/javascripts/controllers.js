var lexControllers = angular.module('lexControllers', []);

lexControllers.controller('SkillsetIndexCtrl', ['$scope', 'Skillset', '$location', function($scope, Skillset, $location){
  $scope.skillsets = Skillset.query();

  $scope.delete = function(doc){
    Skillset.delete({skillsetId: doc._id});
  };
}]);

lexControllers.controller('SkillsetShowCtrl', ['$scope', '$routeParams', 'Skillset', function($scope, $routeParams, Skillset){
  $scope.skillset = Skillset.get({skillsetId: $routeParams.skillsetId});
}]);

lexControllers.controller('SkillsetNewCtrl', ['$scope', 'Skillset', '$location', function($scope, Skillset, $location){
  $scope.create = function(skillset){
    Skillset.save({}, skillset);
    $location.path("#skillsets");
  };
}]);

lexControllers.controller('SkillsetEditCtrl', ['$scope', '$routeParams', 'Skillset', '$location', function($scope, $routeParams, Skillset, $location){
  $scope.skillset = Skillset.get({skillsetId: $routeParams.skillsetId});
  $scope.update = function(doc){
    var updatedSkillset = Skillset.update({skillsetId: doc._id}, doc);
    $location.path("#skillsets/"+doc._id);
  };
}]);

lexControllers.controller('SkillNewCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'Skillset', 'Skill', function($rootScope, $scope, $routeParams, $location, Skillset, Skill){
  $scope.create = function(doc){
    $rootScope.skills.push(Skill.save({}, {
      skillset_id: $routeParams.skillsetId,
      name: doc.name
    }));
    $scope.newSkill.$setPristine();
    $scope.skill = {};
  };
}]);

lexControllers.controller('SkillIndexCtrl', ['$rootScope', '$scope', '$routeParams', 'Skillset', 'Skill', function($rootScope, $scope, $routeParams, Skillset, Skill){
  $rootScope.skills = Skill.query({skillsetId: $routeParams.skillsetId});

  $scope.increment = function(skill){
    skill.exp++;
    skill.updateType = "exp";
    Skill.update({skillId: skill._id}, skill, function(val, headers){
      skill.level = val.level;
    });
  };
  $scope.decrement = function(skill){
    skill.exp--;
    skill.updateType = "exp";
    Skill.update({skillId: skill._id}, skill, function(val, headers){
      skill.level = val.level;
    });
  };
}]);