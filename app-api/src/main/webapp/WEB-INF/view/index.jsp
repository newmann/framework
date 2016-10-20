<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.5
Version: 4.5.1
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js" data-ng-app="MetronicApp"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" data-ng-app="MetronicApp"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh-CN" data-ng-app="MetronicApp">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <title data-ng-bind="'Metronic AngularJS | ' + $state.current.data.pageTitle"></title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <!--<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />-->
        <link href="static/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="static/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="static/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="static/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
        <link href="static/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN DYMANICLY LOADED CSS FILES(all plugin and page related styles must be loaded between GLOBAL and THEME css files ) -->
        <link id="ng_load_plugins_before" />
        <!-- END DYMANICLY LOADED CSS FILES -->
        <!-- BEGIN THEME STYLES -->
        <!-- DOC: To use 'rounded corners' style just load 'components-rounded.css' stylesheet instead of 'components.css' in the below style tag -->
        <link href="static/assets/global/css/components.css" id="style_components" rel="stylesheet" type="text/css" />
        <link href="static/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
        <link href="static/assets/layouts/layout/css/layout.css" rel="stylesheet" type="text/css" />
        <link href="static/assets/layouts/layout/css/themes/darkblue.css" rel="stylesheet" type="text/css" id="style_color" />
        <link href="static/assets/layouts/layout/css/custom.css" rel="stylesheet" type="text/css" />

        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="static/assets/pages/css/login.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->

        <!-- END THEME STYLES -->
        <link rel="shortcut icon" href="static/favicon.ico" /> </head>
    <!-- END HEAD -->
    <!-- BEGIN BODY -->
    <!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
    <!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
    <!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
    <!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
    <!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
    <!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
    <!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
    <!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
    <!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->

    <body ng-controller="AppController" class="page-header-fixed page-sidebar-closed-hide-logo page-on-load" ng-class="{'page-content-white': settings.layout.pageContentWhite,'page-container-bg-solid': settings.layout.pageBodySolid, 'page-sidebar-closed': settings.layout.pageSidebarClosed}">
        <!-- BEGIN PAGE SPINNER -->
        <div ng-spinner-bar class="page-spinner-bar">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <!-- END PAGE SPINNER -->

        <!-- 整个页面进行重新布局 -->
        <div ui-view="MainFramework"></div>

        <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
        <!-- BEGIN CORE JQUERY PLUGINS -->
        <!--[if lt IE 9]>
        <script src="static/assets/global/plugins/respond.min.js"></script>
        <script src="static/assets/global/plugins/excanvas.min.js"></script>
        <![endif]-->
        <script src="static/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE JQUERY PLUGINS -->
        <!-- BEGIN CORE ANGULARJS PLUGINS -->
        <%--<script src="static/assets/global/plugins/angularjs/angular.min.js" type="text/javascript"></script>--%>
        <%--<script src="static/assets/global/plugins/angularjs/angular-sanitize.min.js" type="text/javascript"></script>--%>
        <%--<script src="static/assets/global/plugins/angularjs/angular-touch.min.js" type="text/javascript"></script>--%>
        <%--<script src="static/assets/global/plugins/angularjs/angular-cookies.min.js" type="text/javascript"></script>--%>
        <%--<script src="static/assets/global/plugins/angularjs/plugins/angular-ui-router.min.js" type="text/javascript"></script>--%>
        <%--<script src="static/assets/global/plugins/angularjs/plugins/ocLazyLoad.min.js" type="text/javascript"></script>--%>
        <%--<script src="static/assets/global/plugins/angularjs/plugins/ui-bootstrap-tpls.min.js" type="text/javascript"></script>--%>
        <script src="static/assets/global/plugins/angular/angular.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/angular-sanitize/angular-sanitize.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/angular-touch/angular-touch.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/angular-cookies/angular-cookies.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/angular-ui-router/release/angular-ui-router.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/oclazyload/dist/ocLazyLoad.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/angular-bootstrap/ui-bootstrap-tpls.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/restangular/dist/restangular.min.js" type="text/javascript"></script>
        <script src="static/assets/global/plugins/lodash/dist/lodash.min.js" type="text/javascript"></script>
        <!-- END CORE ANGULARJS PLUGINS -->
        <!-- BEGIN APP LEVEL ANGULARJS SCRIPTS -->
        <script src="static/admin/js/main.js" type="text/javascript"></script>
        <script src="static/admin/js/directives.js" type="text/javascript"></script>
        <!-- BEGIN DYMANICLY LOADED JS FILES() -->
        <link id="ng_load_plugins_after" />
        <!-- END DYMANICLY LOADED JS FILES -->

        <!-- END APP LEVEL ANGULARJS SCRIPTS -->

        <!-- BEGIN APP LEVEL JQUERY SCRIPTS -->
        <script src="static/assets/global/scripts/app.js" type="text/javascript"></script>
        <script src="static/assets/layouts/layout/scripts/layout.js" type="text/javascript"></script>
        <script src="static/assets/layouts/global/scripts/quick-sidebar.js" type="text/javascript"></script>
        <script src="static/assets/layouts/layout/scripts/demo.js" type="text/javascript"></script>
        <!-- END APP LEVEL JQUERY SCRIPTS -->
        <!-- END JAVASCRIPTS -->
    </body>
    <!-- END BODY -->

</html>