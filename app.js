var app = angular.module('userApp', [
    'ngRoute'
]);


// Config
app.config(['$routeProvider',
    function($routeProvider) {
        
        $routeProvider.
        when('/lists', {
            templateUrl: 'lists.html',
            controller: 'MainController'
        }).

        when('/user/:userId', {
            templateUrl: 'detail.html',
            controller: 'DetailController'
        }).

        otherwise({
            redirectTo: '/lists'
        });
    }
]);


// MainController for list Page
app.controller('MainController', function($scope, $http) {

    $http.get("https://api.github.com/search/users?q=tom").success(function(response) {
        $scope.users = response.items;
    });

});


// DetailController for Detail Page
app.controller('DetailController', function($scope, $http, $routeParams) {

    var url = "https://api.github.com/users/" + $routeParams.userId + "/received_events";
    
    $http.get(url).success(function(response) {
        $scope.details = response;
        // alert(JSON.stringify($scope.details));
    });

});


// Search Filter By Login Name
app.filter('searchFor', function() {
    return function(arr, searchName) {

        if (!searchName) {
            return arr;
        }

        var result = [];
        searchName = searchName.toLowerCase();

        angular.forEach(arr, function(item) {
            if (item.login.toLowerCase().indexOf(searchName) !== -1) {
                result.push(item);
            }

        });

        return result;
    };
});
