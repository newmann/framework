/* Setup Layout Part - Sidebar */
MetronicApp.controller('WorkSidebarController', ['$scope', function($scope) {
    // $scope.$on('$viewContentLoaded', function(event) {
    //     Layout.initSidebar(); // init sidebar
    // });
    console.info("MetronicApp WorkSideController..");
    $scope.$on('$viewContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });

}]);




