var Resume = angular.module('resume', []);

Resume.controller('CareerController', function($scope) {
    $scope.open = {};
    $scope.more = function(key) {
        if($scope.open[key]) {
            $scope.open[key] = false;
        } else {
            $scope.open[key] = true;
        }
    };
});

Resume.controller('ExperienceController', function($scope, $http) {
    $scope.data = {};
    $scope.years = [];
    $scope.yearIndex = {};
    $scope.currentItemId = null;
    
    $http.get('./js/resume.json').success(function(data){
        $scope.data = data;
        for(var y=data.startYear; y <= data.endYear; y++) {
            var year = {year : y, items : []};
            $scope.yearIndex[y] = year;
            $scope.years.push(year);
        }

        for(var i=0; i < data.exp.length; i++) {
            var exp = data.exp[i];
            $scope.yearIndex[exp.year].items.push(exp);
        }
    });

    $scope.expandItem = function(item) {
        if($scope.currentItemId == item.id) {
            $scope.currentItemId = null;
        } else {
            $scope.currentItemId = item.id;
        }
    }
});
