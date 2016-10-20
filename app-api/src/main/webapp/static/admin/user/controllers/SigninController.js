/**
 * Created by xinsheng.hu on 2016/10/5.
 */

//TODO:SigninController

angular.module('MetronicApp').controller('SigninController', ['$rootScope','$scope',
    'UserService', function($rootScope, $scope, UserService ) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components

    });
    console.info("Run MetronicApp SigninController..");

    $scope.signin = function(){
        console.log("call SigninController.signin...");
        var signinResponse = UserService.signin($scope.signin.email,$scope.signin.userName,$scope.signin.password);
        signinResponse.then(function(response){
            console.log("正确注册" ,response);
        },function(response){
            console.log("注册错误" ,response );
        });

    };

}]);