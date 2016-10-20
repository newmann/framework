/**
 * Created by xinsheng.hu on 2016/10/5.
 */

//TODO:LoginController

angular.module('MetronicApp').controller('LoginController', ['$rootScope','$scope',
    'UserService',
function($rootScope, $scope,UserService ) {
    console.info("Run MetronicApp LoginController..");
    // $scope.login={ussername:"",
    //     password:"",
    //     remember:false};

    $scope.login = function(){
        console.log("call LoginController.login...");
        var loginResult = UserService.login($scope.login.username,$scope.login.password);
        loginResult.then(function(response){
            console.log("Login process OK" ,response);
        },function(response){
            console.log("There was an error logining" ,response );
        });

    };

    // $scope.$on('$viewContentLoaded', function() {
    //     // initialize core components
    //
    // });

}]);