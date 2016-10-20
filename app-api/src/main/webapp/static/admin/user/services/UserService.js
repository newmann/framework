/**
 * Created by xinsheng.hu on 2016/10/6.
 */
angular.module('MetronicApp').factory('UserService', ['$rootScope', 'Restangular',
    function($rootScope,Restangular) {
        var baseUser = Restangular.all('user');

        var UserService={
            getUserById : function(userID){
                return Restangular.one('user',userID).get();
            },
            login: function(userName,password){
                console.log("Call UserService.login...");
                // return baseUser.one('login',{username:userName,password:password}).put();
                return baseUser.all('login').post({userName:userName,password:password});
            },
            signin: function(email,userName,password){
                return baseUser.all('signin').post({email:email,userName:userName,password:password});
            }
        };
        return UserService;
}]);