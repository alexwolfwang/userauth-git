/**
 * Created by Alex.W on 2016/10/1.
 */

app2.controller('dashCtrl',function($scope,$http) {

  $scope.getUser = function() {
    console.log('Getting user...');

    $http.get('/getuser')
      .then(function onSuccess(user) {
        $scope.user = user.data;
        console.log(12)
      })
      .catch(function onError(err) {
        console.log(err)
      })
  }



});
