/**
 * Created by Alex.W on 2016/9/26.
 */
app.controller('signupCtrl',function($scope,$http) {
  $scope.formAttrs =
    [
      {
        type:'text',
        name:'name',
        placeholder:'Name',
        model:''
      },
      {
        type:'email',
        name:'email',
        placeholder:'Email Address',
        model:''
      },
      {
        type:'password',
        name:'password',
        placeholder:'Password',
        model:''
      },
      {
        type:'password',
        name:'password2',
        placeholder:'Password comfirm',
        model:''
      }
    ];
  $scope.test = {};
  $scope.runSignup = function() {

    console.log("haha" + $scope.test.name)

  }

  $http.post('/signup',{
      name:$scope.name,
      email:$scope.email,
      password:$scope.passwords
    })
    .then(function onSuccess(response) {
      window.location = '/user';
      console.log("~~~~")
    })
    .catch(function onError(err) {
      console.log('Error: ' + err)
    })

})
/**
 * Created by Alex.W on 2016/9/30.
 */
