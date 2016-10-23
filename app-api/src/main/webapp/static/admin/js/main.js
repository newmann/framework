/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize","ngCookies",
    "restangular"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    // console.info("MetronicApp.config..");
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // console.info("MetronicApp.factory settings..");
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'static/assets',
        globalPath: 'static/assets/global',
        layoutPath: 'static/assets/layouts/layout',
        tokenCookieName: 'beiyelinClient',
        responseStatus:{
            RESULT_OK:"ok",
            RESULT_ERROR:"err"
        }
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    console.info("MetronicApp AppController..");
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    // $scope.$on('$viewContentLoaded', function(event) {
    //     Layout.initHeader(); // init header
    // });
    console.info("MetronicApp HeaderController..");
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);



/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {
    console.info("MetronicApp QuickSidebarController..");
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {
    console.info("MetronicApp ThemePanelController..");
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);



/* Setup Rounting For All Pages */
/*
    整个前端大状态有两个：已登录和未登录

    在两个大状态下面，有不同的小状态：
        未登录：注册、登录、修改密码
        已登录：很多功能模块

 */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    console.info("MatronicApp state config...");
    // Redirect any unmatched url
    // $urlRouterProvider.otherwise("/dashboard.html");
    $urlRouterProvider.otherwise("/public/frame/login");

    $stateProvider
        .state('public',{
            abstract: true,
            url: "/public",
            views:{
                "MainFramework":{
                    templateUrl: "static/admin/tpl/public-framework.html"
                }
            }

        })
        .state('public.frame',{
            abstract: true,
            url: "/frame",
            views:{
                "LogoutHeader":{
                    templateUrl: "static/admin/tpl/public-header.html",
                    controller: "LogoutHeaderController",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'static/admin/js/controllers/LogoutHeaderController.js'
                                ]
                            });
                        }]
                    }

                },
                "PageContent":{
                    templateUrl: "static/admin/tpl/public-page-content.html"
                },
                "Footer":{
                    templateUrl: "static/admin/tpl/footer.html",
                    controller: "FooterController",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'static/admin/js/controllers/FooterController.js'
                                ]
                            });
                        }]
                    }
                }

            }

        })

        .state('public.frame.login',{
                url: "/login",
                views: {
                    "Content":{
                        templateUrl: "static/admin/user/views/login.html",
                        data: {pageTitle: '登录'},
                        controller: "LoginController",
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'MetronicApp',
                                    insertBefore: '#ng_load_plugins_after',
                                    files: [
                                        'static/admin/user/services/UserService.js',
                                        'static/admin/user/controllers/LoginController.js'
                                    ]
                                });
                            }]
                        }

                    }

                }
            }
        )

        .state('public.frame.signin',{
                url: "/signin",
                views: {
                    "Content":{
                        templateUrl: "static/admin/user/views/signin.html",
                        data: {pageTitle: '注册'},
                        controller: "SigninController",
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'MetronicApp',
                                    insertBefore: '#ng_load_plugins_after',
                                    files: [
                                        'static/admin/user/services/UserService.js',
                                        'static/admin/user/controllers/SigninController.js'
                                    ]
                                });
                            }]
                        }

                    }
                }
            }
        )
        .state('public.frame.forget',{
                url: "/forget",
                views: {
                    "Content":{
                        templateUrl: "static/admin/user/views/forget-password.html",
                        data: {pageTitle: '忘记密码'},
                        controller: "ForgetController",
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'MetronicApp',
                                    insertBefore: '#ng_load_plugins_after',
                                    files: [
                                        'static/admin/user/controllers/ForgetController.js'
                                    ]
                                });
                            }]
                        }

                    }
                }
            }
        )

        .state('work',{
            abstract: true,
            url: "/work",
            views:{
                "MainFramework":{
                    templateUrl: "static/admin/tpl/work-framework.html"
                }
            }

        })
        .state('work.frame',{
            abstract: true,
            url: "/frame",
            views:{
                "Header":{
                    templateUrl: "static/admin/tpl/work-header.html",
                    controller: "WorkHeaderController",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'static/admin/js/controllers/WorkHeaderController.js'
                                ]
                            });
                        }]
                    }

                },
                "Sidebar":{
                    templateUrl: "static/admin/tpl/work-sidebar.html",
                    controller: "WorkSidebarController",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'static/admin/js/controllers/WorkSidebarController.js'
                                ]
                            });
                        }]
                    }

                },

                "PageContent":{
                    templateUrl: "static/admin/tpl/work-page-content.html"
                },
                "Footer":{
                    templateUrl: "static/admin/tpl/footer.html",
                    controller: "FooterController",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'static/admin/js/controllers/FooterController.js'
                                ]
                            });
                        }]
                    }
                }

            }

        })

        // Dashboard
        .state('work.frame.dashboard', {
            url: "/dashboard",
            views:{
                "Content":{
                    templateUrl: "static/admin/views/dashboard.html",
                    data: {pageTitle: 'Admin Dashboard Template'},
                    controller: "DashboardController",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                files: [
                                    'static/assets/global/plugins/morris/morris.css',
                                    'static/assets/global/plugins/morris/morris.min.js',
                                    'static/assets/global/plugins/morris/raphael-min.js',
                                    'static/assets/global/plugins/jquery.sparkline.min.js',

                                    'static/assets/pages/scripts/dashboard.min.js',
                                    'static/admin/js/controllers/DashboardController.js',
                                ]
                            });
                        }]
                    }
                }
            }
        })

// WORK STATE 暂时不处理
    /*

        // AngularJS plugins
        .state('work.fileupload', {
            url: "/file_upload",
            views:{
                "Content":{
                    templateUrl: "static/admin/views/file_upload.html",
                    data: {pageTitle: 'AngularJS File Upload'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'angularFileUpload',
                                files: [
                                    'static/assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                                ]
                            }, {
                                name: 'MetronicApp',
                                files: [
                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            }]);
                        }]
                    }
                }
            }
        })

        // UI Select
        .state('work.uiselect', {
            url: "/ui_select",
            views:{
                "Content": {

                    templateUrl: "static/admin/views/ui_select.html",
                    data: {pageTitle: 'AngularJS Ui Select'},
                    controller: "UISelectController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'ui.select',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                                    'static/assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                                ]
                            }, {
                                name: 'MetronicApp',
                                files: [
                                    'static/admin/js/controllers/UISelectController.js'
                                ]
                            }]);
                        }]
                    }
                }
            }
        })

        // UI Bootstrap
        .state('work.uibootstrap', {
            url: "/ui_bootstrap",
            views: {
                "Content": {

                    templateUrl: "static/admin/views/ui_bootstrap.html",
                    data: {pageTitle: 'AngularJS UI Bootstrap'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'MetronicApp',
                                files: [
                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            }]);
                        }]
                    }
                }
            }
        })

        // Tree View
        .state('work.tree', {
            url: "/tree",
            views: {
                "Content": {
                    templateUrl: "static/admin/views/tree.html",
                    data: {pageTitle: 'jQuery Tree View'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/jstree/dist/themes/default/style.min.css',

                                    'static/assets/global/plugins/jstree/dist/jstree.min.js',
                                    'static/assets/pages/scripts/ui-tree.min.js',
                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            }]);
                        }]
                    }
                }
            }
        })     

        // Form Tools
        .state('work.formtools', {
            url: "/form-tools",
            views: {
                "Content": {
                    templateUrl: "static/admin/views/form_tools.html",
                    data: {pageTitle: 'Form Tools'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                                    'static/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                                    'static/assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                                    'static/assets/global/plugins/typeahead/typeahead.css',

                                    'static/assets/global/plugins/fuelux/js/spinner.min.js',
                                    'static/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                                    'static/assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                                    'static/assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                                    'static/assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                                    'static/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                                    'static/assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                                    'static/assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                                    'static/assets/global/plugins/typeahead/handlebars.min.js',
                                    'static/assets/global/plugins/typeahead/typeahead.bundle.min.js',
                                    'static/assets/pages/scripts/components-form-tools-2.min.js',

                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            }]);
                        }]
                    }
                }
            }
        })        

        // Date & Time Pickers
        .state('work.pickers', {
            url: "/pickers",
            views: {
                "Content": {

                    templateUrl: "static/admin/views/pickers.html",
                    data: {pageTitle: 'Date & Time Pickers'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/clockface/css/clockface.css',
                                    'static/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                    'static/assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                                    'static/assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                                    'static/assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                                    'static/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                                    'static/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'static/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                                    'static/assets/global/plugins/clockface/js/clockface.js',
                                    'static/assets/global/plugins/moment.min.js',
                                    'static/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                                    'static/assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                                    'static/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                                    'static/assets/pages/scripts/components-date-time-pickers.min.js',

                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            }]);
                        }]
                    }
                }
            }
        })

        // Custom Dropdowns
        .state('work.dropdowns', {
            url: "/dropdowns",
            views: {
                "Content": {
                    templateUrl: "static/admin/views/dropdowns.html",
                    data: {pageTitle: 'Custom Dropdowns'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                                    'static/assets/global/plugins/select2/css/select2.min.css',
                                    'static/assets/global/plugins/select2/css/select2-bootstrap.min.css',

                                    'static/assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                                    'static/assets/global/plugins/select2/js/select2.full.min.js',

                                    'static/assets/pages/scripts/components-bootstrap-select.min.js',
                                    'static/assets/pages/scripts/components-select2.min.js',

                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            }]);
                        }]
                    }
                }
            }
        }) 

        // Advanced Datatables
        .state('work.datatablesAdvanced', {
            url: "/datatables/managed",
            views: {
                "Content": {

                    templateUrl: "static/admin/views/datatables/managed.html",
                    data: {pageTitle: 'Advanced Datatables'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/datatables/datatables.min.css',
                                    'static/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

                                    'static/assets/global/plugins/datatables/datatables.all.min.js',

                                    'static/assets/pages/scripts/table-datatables-managed.min.js',

                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            });
                        }]
                    }
                }
            }
        })

        // Ajax Datetables
        .state('work.datatablesAjax', {
            url: "/datatables/ajax",
            views: {
                "Content": {

                    templateUrl: "static/admin/views/datatables/ajax.html",
                    data: {pageTitle: 'Ajax Datatables'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/datatables/datatables.min.css',
                                    'static/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                                    'static/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

                                    'static/assets/global/plugins/datatables/datatables.all.min.js',
                                    'static/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'static/assets/global/scripts/datatable.js',

                                    'static/admin/js/scripts/table-ajax.js',
                                    'static/admin/js/controllers/GeneralPageController.js'
                                ]
                            });
                        }]
                    }
                }
            }
        })

        // User Profile
        .state("work.profile", {
            url: "/profile",
            views: {
                "Content": {

                    templateUrl: "static/admin/views/profile/main.html",
                    data: {pageTitle: 'User Profile'},
                    controller: "UserProfileController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                                    'static/assets/pages/css/profile.css',

                                    'static/assets/global/plugins/jquery.sparkline.min.js',
                                    'static/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                                    'static/assets/pages/scripts/profile.min.js',

                                    'static/admin/js/controllers/UserProfileController.js'
                                ]
                            });
                        }]
                    }
                }
            }
        })

        // User Profile Dashboard
        .state("work.profile.dashboard", {
            url: "/dashboard",
            templateUrl: "static/admin/views/profile/dashboard.html",
            data: {pageTitle: 'User Profile'}
        })

        // User Profile Account
        .state("work.profile.account", {
            url: "/account",
            templateUrl: "static/admin/views/profile/account.html",
            data: {pageTitle: 'User Account'}
        })

        // User Profile Help
        .state("work.profile.help", {
            url: "/help",
            templateUrl: "static/admin/views/profile/help.html",
            data: {pageTitle: 'User Help'}
        })

        // Todo
        .state('work.todo', {
            url: "/todo",
            views: {
                "Content": {

                    templateUrl: "static/admin/views/todo.html",
                    data: {pageTitle: 'Todo'},
                    controller: "TodoController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                                files: [
                                    'static/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                    'static/assets/apps/css/todo-2.css',
                                    'static/assets/global/plugins/select2/css/select2.min.css',
                                    'static/assets/global/plugins/select2/css/select2-bootstrap.min.css',

                                    'static/assets/global/plugins/select2/js/select2.full.min.js',

                                    'static/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',

                                    'static/assets/apps/scripts/todo-2.min.js',

                                    'static/admin/js/controllers/TodoController.js'
                                ]
                            });
                        }]
                    }
                }
            }
        })
*/
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state","$cookieStore","Restangular",
    function($rootScope, settings, $state,$cookieStore,Restangular) {
        console.info("MetronicApp.run..");
        $rootScope.$state = $state; // state to be accessed from view
        $rootScope.$settings = settings; // state to be accessed from view
        //获取存储在cookie中的token
        try{
            var t = $cookieStore.get(settings.tokenCookieName);
        }catch (ex){
            Console.log(ex);
            var t = "";
        }
        $rootScope.token = t;
        /*配置restangular（refer: https://github.com/mgonto/restangular#configuring-restangular） */
        Restangular.setBaseUrl('http://localhost:8080/framework/api');
        Restangular.setDefaultHeaders({token: $rootScope.token});
}]);