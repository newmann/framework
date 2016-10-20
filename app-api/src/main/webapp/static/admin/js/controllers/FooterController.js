/**
 * Created by xinsheng.hu on 2016/10/5.
 */
//TODO:FooterController
angular.module('MetronicApp').controller('FooterController', ['$scope', function($scope) {
    console.info("Run MetronicApp FooterController..");
    $scope.$on('$viewContentLoaded', function() {
        Layout.initFooter(); // init footer
    });

    // $scope.$on('$includeContentLoaded', function() {
    //     Layout.initFooter(); // init footer
    // });
}]);




