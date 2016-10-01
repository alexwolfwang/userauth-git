/**
 * Created by Alex.W on 2016/9/26.
 */
app.controller('signupCtrl',function($scope,$http) {

  $scope.runSignup = function() {

    console.log("haha" + $scope.name);
    $http.post('/signup',{
        name:$scope.name,
        email:$scope.email,
        password:$scope.password
      })
      .then(function onSuccess(response) {
        window.location = '/user';
        console.log("~~~~")
      })
      .catch(function onError(err) {
        console.log('Error1: ' + err)
      })
  };



})
