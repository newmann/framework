/**
 * Created by xinsheng.hu on 2016/10/6.
 */
angular.module('MetronicApp').factory('UserService', ['$rootScope', 'Restangular',
    function($rootScope,Restangular) {
        var baseUser = Restangular.all('user');

        var UserService={
            //获取用户信息
            getUserById : function(userID){
                return baseUser.one('get',userID).get();
            },
            //登录验证
            login: function(loginData){
                console.log("Call UserService.login...");
                // return baseUser.one('login',{username:userName,password:password}).put();
                return baseUser.all('login').post(loginData);
            },
            //注册
            signin: function(signinForm){
                return baseUser.all('signin').post(signinForm);
            },
            //注册手机号重复重复性检查
            checkSigninPhone:function(phone){
                return baseUser.one('checkSigninPhone',phone).get();
            }
        };
        return UserService;
}]);