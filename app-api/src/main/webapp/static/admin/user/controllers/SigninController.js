/**
 * Created by xinsheng.hu on 2016/10/5.
 */

//TODO:SigninController

angular.module('MetronicApp').controller('SigninController', ['$rootScope','$scope',"$state",
    'UserService', function($rootScope, $scope,$state, UserService ) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components

    });

    // $scope.signinData._tnc = false;
    console.info("Run MetronicApp SigninController..");
    $scope.submited = false;
    $scope.submitStatus = false;
    $scope.submitMessage = "";

    $scope.signin = function(){
        $scope.submited = false;
        console.log("call SigninController.signin...");
        var signinResponse = UserService.signin($scope.signinData);
        signinResponse.then(function(response){
            console.log("正确注册" ,response);
            $scope.submitStatus = true;
            $scope.submitMessage ="正确注册";
            $scope.submited = true;
            $state.go("public.login");
        },function(response){
            console.log("注册错误" ,response );
            $scope.submitStatus = false;
            $scope.submitMessage ="注册时发生错误：" + response.result;
            $scope.submited = true;
        });

    };

}]);