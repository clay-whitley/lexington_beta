var lexServices = angular.module('lexServices', ['ngResource']);

lexServices.factory('Skillset', ['$resource',
  function($resource){
    return $resource('skillsets/:skillsetId.json', {}, {
      update: {method:'PUT'}
    });
  }]);

lexServices.factory('Skill', ['$resource',
  function($resource){
    return $resource('skills/:skillId.json', {}, {
      update: {method:'PUT'}
    });
  }]);