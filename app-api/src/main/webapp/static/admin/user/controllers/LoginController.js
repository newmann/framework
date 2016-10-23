/**
 * Created by xinsheng.hu on 2016/10/5.
 */

//TODO:LoginController

angular.module('MetronicApp').controller('LoginController', ['$rootScope','$scope','$state',
    'UserService',function($rootScope, $scope,$state,UserService ) {
    console.info("Run MetronicApp LoginController..");
    // $scope.login={ussername:"",
    //     password:"",
    //     remember:false};
    $scope.submited = false;
    $scope.submitStatus = false;
    $scope.submitMessage = "";
    $scope.remember = false;//是否需要记住我

    $scope.login = function(){
        console.log("call LoginController.login...");
        var loginResult = UserService.login($scope.loginData);
        loginResult.then(function(response){
            console.log("Login process OK" ,response);
            $scope.submitStatus = true;
            $scope.submitMessage ="正确登录";
            $scope.submited = true;
            $state.go("work.frame.dashboard");
        },function(response){
            console.log("There was an error logining" ,response );
            console.log("登录错误" ,response );
            $scope.loginStatus = false;
            $scope.loginMessage ="登录时发生错误：" + response.result;
            $scope.loginsubmited = true;
        });

    };

    // $scope.$on('$viewContentLoaded', function() {
    //     // initialize core components
    //
    // });

}]);