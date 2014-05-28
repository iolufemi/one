angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('learnCtrl', function($scope) {
})

.controller('startCtrl', function($scope,$ionicActionSheet) {
    //Set Default Values
    $scope.pay = 19000;
    $scope.principal = 40000;
    $scope.suprincipal = $scope.principal;
    $scope.durationlist = [3,6,9,12];
    $scope.defaultduration = 9;
    $scope.sudefaultduration = $scope.defaultduration;
    $scope.otherrepayments = 0;
    $scope.errormessage = "";
    //Start Calculation
    $scope.repayment = parseInt(($scope.principal * (1 + (0.0575 * $scope.defaultduration))).toFixed(2));    
    $scope.monthlyrepayment = parseInt(($scope.repayment / $scope.defaultduration).toFixed(2));
    if($scope.principal < 40000){
        $scope.errormessage = "You cannot get a loan below 40,000 Naira";
    }else if($scope.principal  < 100000 && $scope.defaultduration > 9){
        $scope.errormessage = "You can only get a 3 month or 9 month loan at this Amount";
    }
    var totalloan = $scope.monthlyrepayment +  $scope.otherrepayments;
    var allowed = 0.4 * $scope.pay;
    if((totalloan) > (allowed)){
        $scope.errormessage = "Your salary is too low for this loan";
    }else{
            $scope.errormessage = ""
        }
    //Calculate Principal from Salary
    $scope.getloan = function(){
        if(this.pay <= 43000){
            $scope.sudefaultduration = 9;
        }else if(this.pay > 43000){
            $scope.sudefaultduration = 12;
        }else{
            $scope.sudefaultduration = 3;
        }
        $scope.defaultduration = $scope.sudefaultduration;
        $scope.suprincipal = ((0.4 * this.pay * $scope.sudefaultduration) / (1 + (0.0575 * $scope.sudefaultduration))) - 10000;
        if($scope.suprincipal > 500000){
            $scope.principal = 500000;
        }else{
            $scope.suprincipal = parseInt((($scope.suprincipal / 10000).toFixed(0))) * 10000;
           $scope.principal = $scope.suprincipal; 
        } 
        //Start Calculation
        $scope.repayment = parseInt(($scope.principal * (1 + (0.0575 * $scope.defaultduration))).toFixed(2));    
        $scope.monthlyrepayment = parseInt(($scope.repayment / $scope.defaultduration).toFixed(2));
        if($scope.principal < 40000){
            $scope.errormessage = "You cannot get a loan below 40,000 Naira";
        }else if($scope.principal  < 100000 && $scope.defaultduration > 9){
            $scope.errormessage = "You can only get a 3 month or 9 month loan at this Amount";
        }
        var totalloan = $scope.monthlyrepayment +  this.otherrepayments;
        var allowed = 0.4 * this.pay;
        if((totalloan) > (allowed)){
            $scope.errormessage = "Your salary is too low for this loan";
        }else{
            $scope.errormessage = ""
        }
        
    }
    //Calculate Repayments on input change
    
    $scope.onchange = function(){
        $scope.repayment = parseInt((this.principal * (1 + (0.0575 * this.defaultduration))).toFixed(2));    
        $scope.monthlyrepayment = parseInt(($scope.repayment / this.defaultduration).toFixed(2));
        if(this.principal < 40000){
            $scope.errormessage = "You cannot get a loan below 40,000 Naira";
        }else if(this.principal  < 100000 && this.defaultduration > 9){
            $scope.errormessage = "You can only get a 3 month or 9 month loan at this Amount";
        }
        var totalloan = $scope.monthlyrepayment +  this.otherrepayments;
        //alert(  this.otherrepayments+' '+$scope.monthlyrepayment+' '+totalloan+" "+ 0.4 * $scope.pay);
        var allowed = 0.4 * this.pay;
        if((totalloan) > (allowed)){
            $scope.errormessage = "Your salary is too low for this loan";
        }else{
            $scope.errormessage = "";
        }
    } 
     //Show action sheet
     $scope.show = function() {
    
       // Show the action sheet
       $ionicActionSheet.show({
         buttons: [
           { text: '<i class="icon ion-social-facebook"></i> Sign Up With Facebook' },
           { text: '<i class="icon ion-android-mail"></i> Sign Up With Your Email' },
         ],
         destructiveText: 'Reload Calculator',
         titleText: 'Sign Up <i class="icon ion-android-send"></i>',
         cancelText: 'Cancel',
         buttonClicked: function(index) {
           return true;
         },
         destructiveButtonClicked: function() {
           $route.reload();
         },
         
       });
    
     };
    
    


    
    
    
    
})
.controller('signinCtrl', function($scope) {
});
