/**
 * Created by xinsheng.hu on 2016/10/5.
 */
//todo: LogoutHeaderController
angular.module('MetronicApp').controller('LogoutHeaderController', ['$scope', function($scope) {
    console.info("Run MetronicApp LogoutHeaderController..");
    $scope.$on('$viewContentLoaded', function(event) {
        Layout.initHeader(); // init header
    });

    // $scope.$on('$includeContentLoaded', function() {
    //     Layout.initHeader(); // init header
    // });
}]);
