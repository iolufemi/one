angular.module('starter.controllers', [])

.controller('thankyouCtrl', function($scope,$firebaseSimpleLogin,$state,$firebase) {
    var ref = new Firebase('https://onecredit.firebaseio.com/users');
            $scope.auth = $firebaseSimpleLogin(ref);
           $scope.users = $firebase(ref);
           $scope.auth.$logout();
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

.controller('startCtrl', function($scope,$ionicActionSheet,$firebase,$firebaseSimpleLogin,$state,$rootScope,$ionicLoading,Databuffer) {
  var ref = new Firebase('https://onecredit.firebaseio.com/users');
    $scope.auth = $firebaseSimpleLogin(ref);

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
            $scope.suprincipal = 500000;
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
    Databuffer.save({principal:this.principal,duration:this.defaultduration,repayment:this.repayment,monthlyrepayment:this.monthlyrepayment,salary:this.pay});
       // Show the action sheet
       $ionicActionSheet.show({
         buttons: [
           { text: '<i class="icon ion-social-facebook"></i> Sign Up With Facebook' },
           { text: '<i class="icon ion-android-mail"></i> Sign Up With Your Email' },
         ],
         titleText: 'Sign Up',
         cancelText: 'Cancel',
         buttonClicked: function(index) {
           if(index == 0){
            $ionicLoading.show({
            template: 'Loading...'
            });
           $scope.auth.$login('facebook');
           $rootScope.$on("$firebaseSimpleLogin:login", function(evt, user) {
            $state.go('apply');
            $ionicLoading.hide();
            $rootScope.isAuth = true;
            });
           
           return true;
           }else if(index == 1){
           $state.go('signin');
           return true;
           }
           
         }
         
       });
    
     };
    
    


    
    
    
    
})
.controller('signinCtrl', function($scope,$firebaseSimpleLogin,$state,$firebase,$ionicLoading,$rootScope) {
    var ref = new Firebase('https://onecredit.firebaseio.com/users');
            $scope.auth = $firebaseSimpleLogin(ref);
           $scope.users = $firebase(ref);
           $scope.email;
           $scope.password;
           $scope.signin = function(){
            $ionicLoading.show({
            template: 'Loading...'
            });
           $scope.auth.$login('password',{email:this.email,password:this.password});
           $rootScope.$on("$firebaseSimpleLogin:login", function(evt, user) {
            $state.go('apply');
            $ionicLoading.hide();
           })
           
           }
})
.controller('emailsignupCtrl', function($scope,$firebaseSimpleLogin,$state,$firebase,$ionicLoading,$rootScope){ 
           var ref = new Firebase('https://onecredit.firebaseio.com/users');
    $scope.auth = $firebaseSimpleLogin(ref);
           $scope.users = $firebase(ref);
           $scope.email;
           $scope.password;
           $scope.create = function(){
            $ionicLoading.show({
            template: 'Loading...'
            });
           $scope.auth.$createUser(this.email,this.password);
           $scope.auth.$login('password',{email:this.email,password:this.password});
           $rootScope.$on("$firebaseSimpleLogin:login", function(evt, user) {
            $state.go('apply');
            $ionicLoading.hide();
           })
           }
})
.controller('applyCtrl', function($scope,$firebaseSimpleLogin,$state,$firebase,$rootScope,Sendmail,Senduser,$location ,$ionicPopup,Databuffer){ 
          var ref = new Firebase('https://onecredit.firebaseio.com/users');
          
            $scope.auth = $firebaseSimpleLogin(ref);
            $rootScope.$on("$firebaseSimpleLogin:login", function(evt, user) {
                if(user.provider == 'facebook'){
                 $scope.uid = user.id ;
                $scope.fname = user.thirdPartyUserData.first_name ;
               $scope.mname = '';
               $scope.lname = user.thirdPartyUserData.last_name ;
               $scope.dob = '' ;
               $scope.genderlist = ['male','female'] ;
               $scope.defaultgender = user.thirdPartyUserData.gender ;
               $scope.email = user.thirdPartyUserData.email ;
               $scope.phone = '' ;
               $scope.aphone = '' ;
               $scope.address = '';
                }else if(user.provider == 'password'){
                    $scope.uid = user.id ;
                    $scope.email = user.email ;
                    $scope.fname = '' ;
               $scope.mname = '';
               $scope.lname = '';
               $scope.dob = '' ;
               $scope.genderlist = ['male','female'] ;
               $scope.defaultgender = 'male' ;
               $scope.phone = '' ;
               $scope.aphone = '' ;
               $scope.address = '';
                }
                $rootScope.isAuth = true;
            });
            
            $scope.submit = function(){
                $scope.buf = Databuffer.get();
                $scope.user = $firebase(ref);
                $scope.user.$add({'id':$scope.uid,'firstName':this.fname,'middleName':this.mname,'lastName':this.lname,'dateOfBirth':this.dob,'gender':this.defaultgender,'emailAddress':this.email,'mobileNumber1':this.phone,'mobileNumber2': this.aphone,'address':this.address});
               
                $scope.sendmail = Sendmail.send({'email':'olufemi@kvpafrica.com','subject':'New Loan Application From MObile App','message':'<p>A new user signed up for a loan<br />First Name- '+this.fname+'<br />Middle Name- '+this.mname+'<br />Last Name- '+this.lname+'<br />Gender- '+this.defaultgender+'<br />Email Address- '+this.email+'<br />Mobile Number1- '+this.phone+'<br />Mobile Number2- '+this.aphone+'<br />Address- '+this.address+'<br />Loan- '+this.buf.principal+'<br />Duration- '+this.buf.duration+'<br />Total Repayment'+this.buf.repayment+'<br />Monthly Repayment- '+this.buf.monthlyrepayment+'<br />Salary- '+this.buf.salary+'</p>'});
                var userd = {
                    "firstName":this.fname,
                    "lastName":this.lname,
                    "middleName":this.mname,
                    "email":this.email,
                    "mobilePhone1":this.phone,
                    "mobilePhone2":this.aphone,
                    "gender":(this.defaultgender).toUpperCase()
                    };
                    Senduser.send(userd);
                $rootScope.$on('senduser',function(){
                    Databuffer.reset();
                    var ref = new Firebase('https://onecredit.firebaseio.com/users');
            $scope.auth = $firebaseSimpleLogin(ref);
           $scope.users = $firebase(ref);
           $scope.auth.$logout();
                    $ionicPopup.alert({title: 'Application Successful',
       template: 'Thank you for applying, we will contact you soon.'}).then(function(res){
        $location.url('/tab/start/');
       });
                    
                }); 
                
                      
                //Databuffer.reset();
                //$state.go('thankyou');
                
            }
            //$scope.auth.
          /* $scope.fname;
           $scope.mname;
           $scope.lname;
           $scope.dob;
           $scope.genderlist;
           $scope.defaultgender;
           $scope.email;
           $scope.phone;
           $scope.aphone;*/
           
            
});
