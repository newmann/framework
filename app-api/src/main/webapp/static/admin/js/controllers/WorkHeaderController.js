/**
 * Created by xinsheng.hu on 2016/10/22.
 */

angular.module('MetronicApp').controller('WorkHeaderController', ['$scope', function($scope) {
    console.info("Run MetronicApp WorkHeaderController..");
    $scope.$on('$viewContentLoaded', function(event) {
        Layout.initHeader(); // init header
    });

    // $scope.$on('$includeContentLoaded', function() {
    //     Layout.initHeader(); // init header
    // });
}]);
