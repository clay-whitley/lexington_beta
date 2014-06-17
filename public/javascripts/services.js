var lexServices = angular.module('lexServices', ['ngResource']);

lexServices.factory('Session', ['$resource',
  function($resource){
    return $resource('sessions.json', {}, {
      update: {method:'PUT'}
    });
  }]);

lexServices.factory('User', ['$resource',
  function($resource){
    return $resource('users/:userId.json', {}, {
      update: {method:'PUT'}
    });
  }]);

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

lexServices.factory('Report', ['$resource',
  function($resource){
    return $resource('reports/exp.json', {}, {
      update: {method:'PUT'}
    });
  }]);

lexServices.factory('FreqReport', ['$resource', function($resource){
  return $resource('reports/frequency.json', {}, {
    update: {method:'PUT'}
  });
}]);

angular.module('d3', [])
  .factory('d3Service', ['$document', '$window', '$q', '$rootScope',
  function($document, $window, $q, $rootScope) {
    var d = $q.defer(),
        d3service = {
          d3: function() { return d.promise; }
        };
  function onScriptLoad() {
    // Load client in the browser
    $rootScope.$apply(function() { d.resolve($window.d3); });
  }
  var scriptTag = $document[0].createElement('script');
  scriptTag.type = 'text/javascript'; 
  scriptTag.async = true;
  scriptTag.src = 'http://d3js.org/d3.v3.min.js';
  scriptTag.onreadystatechange = function () {
    if (this.readyState == 'complete') onScriptLoad();
  }
  scriptTag.onload = onScriptLoad;
 
  var s = $document[0].getElementsByTagName('body')[0];
  s.appendChild(scriptTag);
 
  return d3service;
}]);