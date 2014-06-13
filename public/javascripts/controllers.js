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
      skill.percentage = val.percentage;
    });
  };
  $scope.decrement = function(skill){
    skill.exp--;
    skill.updateType = "exp";
    Skill.update({skillId: skill._id}, skill, function(val, headers){
      skill.level = val.level;
      skill.percentage = val.percentage;
    });
  };
}]);

lexControllers.controller('ReportShowCtrl', ['$scope', '$routeParams', 'Report', function($scope, $routeParams, Report){
  $scope.myData = [
  {timestamp: "20111001", exp: 5, skill_id: "foo"},
  {timestamp: "20111003", exp: 10, skill_id: "foo"},
  {timestamp: "20111005", exp: 15, skill_id: "foo"},
  {timestamp: "20111009", exp: 25, skill_id: "foo"},
  {timestamp: "20111011", exp: 25, skill_id: "foo"},
  {timestamp: "20111101", exp: 50, skill_id: "foo"},
  {timestamp: "20111111", exp: 25, skill_id: "foo"},
  {timestamp: "20111121", exp: 50, skill_id: "foo"},
  {timestamp: "20111001", exp: 5, skill_id: "bar"},
  {timestamp: "20111003", exp: 5, skill_id: "bar"},
  {timestamp: "20111005", exp: 15, skill_id: "bar"},
  {timestamp: "20111009", exp: 25, skill_id: "bar"},
  {timestamp: "20111011", exp: 30, skill_id: "bar"},
  {timestamp: "20111101", exp: 31, skill_id: "bar"},
  {timestamp: "20111111", exp: 45, skill_id: "bar"},
  {timestamp: "20111121", exp: 50, skill_id: "bar"},
  {timestamp: "20111001", exp: 45, skill_id: "baz"},
  {timestamp: "20111003", exp: 40, skill_id: "baz"},
  {timestamp: "20111005", exp: 30, skill_id: "baz"},
  ];

  $scope.realData = Report.query({skillsetId: "539ab76562ab9bdd16bcff68"}, function(val, headers){
    
  });
}]);