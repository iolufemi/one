angular.module('starter.services', [])
.factory('Sendmail',function($http){
    return {
        send: function(emailJson){
            $http.post('http://apisandbox.one-cred.com/mobileapi/sendmail.json',JSON.stringify(emailJson)).then(function(response){
        return response.data;
      });
      //console.log(emailJson);
        }
    }
})
.factory('Senduser',function($http,$rootScope){
    return {
        send: function(userJson){
            $http.post('http://apisandbox.one-cred.com/mobileapi/senduser.json',JSON.stringify(userJson)).then(function(response){
        $rootScope.$emit('senduser');
        return response.data;
      });
      //console.log(userJson);
        }
    }
    
})
.factory('Databuffer',function(){
    var data = {};
    return {
        save: function($data){
            data = $data;
      },
      get: function(){
            return data;
      },
      reset: function(){
            var data = {};
      }
      //console.log(userJson);
        }
    
});
