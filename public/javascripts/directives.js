var lexDirectives = angular.module('lexDirectives', []);

lexDirectives.directive('d3LineChart', ['d3Service', '$window', function(d3Service, $window) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          var margin = parseInt(attrs.margin) || 40;
          var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L%Z").parse;

          var svg = d3.select(element[0])
            .append('svg')
            .style('width', '100%')
            .attr('height', 500)
            .append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")");

          

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          scope.render = function(data) {
            console.log('rendering D3');
            // our custom d3 code
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;

            scope.data.forEach(function(d) {
              if (typeof d.timestamp == "string"){
                d.timestamp = parseDate(d.timestamp.substring(0, d.timestamp.length-1)+"+0000");
              }
            });

            var width = d3.select(element[0])[0][0].offsetWidth - (margin * 2),
                height = 500 - (margin * 2);

            var x = d3.time.scale()
                .domain(d3.extent(data, function(d) { return d.timestamp; }))
                .range([0, width]);

            var y = d3.scale.linear()
                .domain([0,50])
                .range([height, 0]);

            var color = d3.scale.category10();

            var nest = d3.nest()
            .key(function(d) { return d.skill_id; })
            .entries(data);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .interpolate("linear")
                .x(function(d) { return x(d.timestamp); })
                .y(function(d) { return y(d.current_exp); });

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Experience");

            var skill = svg.selectAll(".skill")
                .data(nest)
              .enter().append("g")
                .attr("class", "skill");

            skill.append("path")
                .attr("class", "line")
                .attr("d", function(d, i) { return line(nest[i].values); })
                .style("stroke", function(d, i) { return color(nest[i].key); });

            nest.forEach(function(nestedSkill){
              var circles = svg.selectAll("circle-"+nestedSkill.key)
                .data(nestedSkill.values)
                .enter()
                .append("circle")
                .attr("class", "circle-"+nestedSkill.key);

              var circlesAttributes = circles
                .attr("cx", function(d){ return x(d.timestamp);})
                .attr("cy", function(d){ return y(d.current_exp);})
                .attr("r", 5)
                .attr("fill", "white")
                .style("stroke", function(d){ return color(nestedSkill.key); });
            });


          };
        });
      }};
  }]);