app.controller('TestController', ['$scope','$http',function($scope,$http){
    $scope.foo = "foo";
    $scope.person = "new person"

    $scope.test = function(){
      var userData = {name:$scope.name};
      console.log(userData.name);
      $http.post("/src/api/user",userData)
        .success(function(data){
          console.log(data);
        })
    }
}]);
