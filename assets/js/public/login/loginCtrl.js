/**
 * Created by Alex.W on 2016/9/26.
 */
app1.controller('loginCtrl',function($scope,$http,toastr) {

  console.log("Login Controller initialized!");

  $scope.runLogin = function() {
    $http.put('/login', {
      email:$scope.email,
      password: $scope.password
    }).then(function onSuccess() {
      window.location = '/dashboard'
    }).catch(function onError(err) {
      if(err.status == 400 || 404) {
        toastr.error('Invalid Credentials', 'Error', {
          closeButton:true
        });
        return;
      }
      toastr.error('An error has occured, please try again later', 'Error', {
        closeButton:true
      });
      return;
    })
  }



});
