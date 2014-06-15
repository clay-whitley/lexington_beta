var lexControllers = angular.module('lexControllers', []);

function ensureAuth(location, scope){
  if (!scope.current_user){
    return location.path('#login');
  }
}

lexControllers.controller('HeaderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'Session', function($scope, $rootScope, $location, $cookies, Session){

  if ($cookies.current_user != 'undefined'){
    $rootScope.current_user = $cookies.current_user;
  }

  $scope.logout = function(){
    Session.delete({}, function(val, headers){
      delete $rootScope.current_user;
      $location.path('#login');
    });
  };
}]);

lexControllers.controller('SessionNewCtrl', ['$scope', '$rootScope', '$location', 'Session', function($scope, $rootScope, $location, Session){

  $scope.user = {};

  $scope.login = function(user){
    Session.save({}, user, function(val, headers){
      if (val.loginSuccess){
        $rootScope.current_user = val.current_user;
        $location.url('/skillsets');
      } else {
        console.log("Incorrect", val.reason);
      }
    });
  };
}]);

lexControllers.controller('UserNewCtrl', ['$scope', '$rootScope', '$location', 'User', 'Session', function($scope, $rootScope, $location, User, Session){

  $scope.user = {};

  $scope.create = function(user){
    User.save({}, user, function(val, headers){
      $rootScope.current_user = val._id;
      $location.path('#skillsets');
    });
  };
}]);

lexControllers.controller('SkillsetIndexCtrl', ['$scope', '$rootScope', 'Skillset', '$location', function($scope, $rootScope, Skillset, $location){
  ensureAuth($location, $rootScope);

  console.log($rootScope.current_user);

  $scope.skillsets = Skillset.query();

  $scope.delete = function(doc){
    Skillset.delete({skillsetId: doc._id});
  };
}]);

lexControllers.controller('SkillsetShowCtrl', ['$scope', '$routeParams', 'Skillset', '$location', '$rootScope', function($scope, $routeParams, Skillset, $location, $rootScope){
  ensureAuth($location, $rootScope);

  $scope.skillset = Skillset.get({skillsetId: $routeParams.skillsetId});
}]);

lexControllers.controller('SkillsetNewCtrl', ['$scope', 'Skillset', '$location', '$rootScope', function($scope, Skillset, $location, $rootScope){
  ensureAuth($location, $rootScope);

  $scope.create = function(skillset){
    Skillset.save({}, skillset);
    $location.path("#skillsets");
  };
}]);

lexControllers.controller('SkillsetEditCtrl', ['$scope', '$routeParams', 'Skillset', '$location', '$rootScope', function($scope, $routeParams, Skillset, $location, $rootScope){
  ensureAuth($location, $rootScope);

  $scope.skillset = Skillset.get({skillsetId: $routeParams.skillsetId});
  $scope.update = function(doc){
    var updatedSkillset = Skillset.update({skillsetId: doc._id}, doc);
    $location.path("#skillsets/"+doc._id);
  };
}]);

lexControllers.controller('SkillNewCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'Skillset', 'Skill', function($rootScope, $scope, $routeParams, $location, Skillset, Skill){
  ensureAuth($location, $rootScope);

  $scope.create = function(doc){
    ensureAuth($location, $rootScope);
    $rootScope.skills.push(Skill.save({}, {
      skillset_id: $routeParams.skillsetId,
      name: doc.name
    }));
    $scope.newSkill.$setPristine();
    $scope.skill = {};
  };
}]);

lexControllers.controller('SkillIndexCtrl', ['$rootScope', '$location', '$scope', '$routeParams', 'Skillset', 'Skill', function($rootScope, $location, $scope, $routeParams, Skillset, Skill){
  ensureAuth($location, $rootScope);

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

lexControllers.controller('ReportShowCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'Report', 'Skillset', function($scope, $rootScope, $location, $routeParams, Report, Skillset){
  ensureAuth($location, $rootScope);

  $scope.hasRan = false;
  $scope.hasCustomRange = false;
  $scope.skillsets = Skillset.query();
  $scope.report = {};

  $('.datepicker').datepicker()
    .on("changeDate", function(e){
      $scope.report[e.target.id] = Date.parse(e.date);
    });

  $scope.runReport = function(report){
    $scope.realData = Report.query({skillsetId: report.skillsetId, range: report.range, startTime: report.startTime, endTime: report.endTime});
    console.log(report);
    $scope.reportConfig.$setPristine();
    $scope.report = {};
    $scope.hasRan = true;
  };

  $scope.configReport = function(){
    $scope.hasRan = false;
  };

  $scope.customRange = function(range){
    if (range == "customRange") {
      $scope.hasCustomRange = true;
    } else {
      $scope.hasCustomRange = false;
    }
  };
}]);