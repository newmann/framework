/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu
                   
                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
]);

// Handle global LINK click
MetronicApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});

//check the input phone number have been used
MetronicApp.directive('checkSigninPhone', ['$rootScope','$q','UserService',function ($rootScope,$q, UserService) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {
            ctrl.$asyncValidators.checkSigninPhone = function (modelValue, viewValue) {
                var d = $q.defer();
                var checkResponse = UserService.checkSigninPhone(modelValue);
                checkResponse.then(function (okRes) {
                    if (okRes.status == $rootScope.settings.responseStatus.RESULT_OK ){
                        d.reject();
                    }else{
                        d.resolve();
                    }
                },function(){
                    d.reject();
                });
                return d.promise;
            }
        }
    }
}]);

//check password
MetronicApp.directive('checkPassword', function () {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {
            var firstPassword = '#' + attrs.checkPassword;
            // 网上好多例子都掉了$(elem) 美元符号和括号
            $(ele).add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // alert(ele.val());
                    var v = ele.val()===$(firstPassword).val();
                    ctrl.$setValidity('noMatch',v);
                });
            });
        }
    }
});
