/*
@Author Olanipekun Olufemi <iolufemi@ymail.com>
@copyright 2014
*/


    $(".input1").change(function () {
        var principal = $('input.input1').val();
        var tenor = $('input.input2').val();
        var salary = $('input.input3').val();
        var repayment = getRepayment(principal,tenor);
        var ddays = repayment / tenor;
        var loan = getloanable(salary);
        if((principal > loan) || (!isTrue(ddays,salary,tenor,principal)) || (principal < 40000 || principal > 500000) || (tenor == 4 || tenor == 1 || tenor == 2 || tenor == 5 || tenor == 7 || tenor == 8 ||/* tenor == 9 ||*/ tenor == 10 || tenor == 11) || (salary < 47000)){
            $('p.notify').html('Amount selected too low for a loan of this tenure');
            $('.btn').attr("disabled", true);
            $('p.notify').addClass('warn');
            //return false;
            
            calculateLoan(principal,tenor,salary);
        }else{
            $('.btn').attr("disabled", false);
            $('p.notify').removeClass('warn');
        //console.log(value);
        

        
        calculateLoan(principal,tenor,salary);
        var message = getMaxLoan(salary);
        $('p.notify').html(message);
        
        }
        
    });
        
    $(".input2").change(function () {
        var principal = $('input.input1').val();
        var tenor = $('input.input2').val();
        var salary = $('input.input3').val();
        var mont = getmonths(salary);
        if((!gmonth(principal,tenor,salary)) || (tenor > mont) || (principal < 40000 || principal > 500000) || (tenor == 4 || tenor == 1 || tenor == 2 || tenor == 5 || tenor == 7 || tenor == 8 || /*tenor == 9 || */tenor == 10 || tenor == 11) || (salary < 47000)){
            $('p.notify').html('Amount selected too low for a loan of this tenure');
            $('.btn').attr("disabled", true);
            $('p.notify').addClass('warn');
            //return false;
            
            calculateLoan(principal,tenor,salary);
        }else{
        $('.btn').attr("disabled", false);
        $('p.notify').removeClass('warn');
        //console.log(value);
        
        
        calculateLoan(principal,tenor,salary);
        var message = getMaxLoan(salary);
        $('p.notify').html(message);
        
        }
        
    });
    
    
   $(".input3").change(function () {
        var salary = $('input.input3').val();
        var principal = getloanable(salary);
        var tenor = getmonths(salary);
        
        if((principal < 40000 || principal > 500000) || (tenor == 4 || tenor == 1 || tenor == 2 || tenor == 5 || tenor == 7 || tenor == 8 || /*tenor == 9 || */tenor == 10 || tenor == 11) || (salary < 47000)){
            $('p.notify').html('Amount selected too low for a loan of this tenure');
            $('.btn').attr("disabled", true);
            $('p.notify').addClass('warn');
            //return false;
            
            calculateLoan(principal,tenor,salary);
        }else{
        //console.log(value);
        $('.btn').attr("disabled", false);
        $('p.notify').removeClass('warn');
        
        
        
        calculateLoan(principal,tenor,salary);
        
        var message = getMaxLoan(salary);
        
        
        $( ".input1" ).val(getloanable(salary));
        $( ".input2" ).val(getmonths(salary));
        $('p.notify').html(message);
        }
        
    });
    
    
        var principal = $('input.input1').val();
        var tenor = $('input.input2').val();
        var salary = $('input.input3').val();
        
        calculateLoan(principal,tenor,salary);
    
    function addCommas(nStr)
    {
    	nStr += '';
    	x = nStr.split('.');
    	x1 = x[0];
    	x2 = x.length > 1 ? '.' + x[1] : '';
    	var rgx = /(\d+)(\d{3})/;
    	while (rgx.test(x1)) {
    		x1 = x1.replace(rgx, '$1' + ',' + '$2');
    	}
    	return x1 + x2;
    }
    
    function getRepayment(principal,tenor){
        var per = 0.0575 * tenor;
        var addit = 1 + per;
        var repayment = principal * addit;
        return repayment;
    }
    
    function isTrue(repayment,salary,tenor,principal){
        var repay = repayment * 2.5;
        if((principal < 100000 ) && (tenor > 6)){
            return false;
        }else if((repay <= salary)){
            return true;
        }else{
           return false; 
        }
    }
    
    function getMaxLoan(salary){
        if(salary < 74000){
            var tenor = 9;
            var principal = getPrincipal(salary,tenor);
        }else{
            var tenor = 12;  
            var principal = getPrincipal(salary,tenor);
            if(principal < 100000){
                var tenor = 9;
                var principal = getPrincipal(salary,tenor);
            }
        }
        
        if(principal > 500000){
            var principal = 500000;
        }
        
        
        return "With net pay of <strong>&#8358 " + addCommas(salary) + "</strong>, the maximum loan amount you can get is <strong>&#8358; " + addCommas(((principal/10000).toFixed(0))*10000) + "</strong> for <strong>" + tenor + " Months</strong>."
        
    }
    
    function getloanable(salary){
        if(salary < 74000){
            var tenor = 9;
            var principal = getPrincipal(salary,tenor);
        }else{
            var tenor = 12;  
            var principal = getPrincipal(salary,tenor);
            if(principal < 100000){
                var tenor = 9;
                var principal = getPrincipal(salary,tenor);
            }
        }
        if(principal > 500000){
            var principal = 500000;
        }
        
        return /*principal.toFixed(0)*/((principal/10000).toFixed(0))*10000;
    }
    
    function getmonths(salary){
        if(salary < 74000){
            var tenor = 9;
            var principal = getPrincipal(salary,tenor);
        }else{
            var tenor = 12;  
            var principal = getPrincipal(salary,tenor);
            if(principal < 100000){
                var tenor = 9;
                var principal = getPrincipal(salary,tenor);
            }
        }
        
        if(principal > 500000){
            var principal = 500000;
        }
        
        return tenor;
    }
    
    function getPrincipal(salary,tenor){
        var per = 0.0575 * tenor;
        var addit  = 1 + per;
        var mult = 2.5 * addit;
        var st = salary * tenor;
        var principal = st / mult;
        return principal;
    }
    
    function gmonth(principal,tenor,salary){
        var repayment = getRepayment(principal,tenor);
        var ddays = repayment / tenor;
        var canrepay = ddays * 2.5;
        if(canrepay > salary){
            return false;
        }else{
            return true;
        }
    }
    
    function calculateLoan(principal,tenor,salary){
        
        var repayment = getRepayment(principal,tenor);
        var ddays = repayment / tenor;
        var cistrue = isTrue(ddays,salary,tenor,principal);
        
        if(!cistrue){

        }else{

        }
        
        $('strong.repay').html('&#8358; ' + addCommas(repayment.toFixed(2)));
        $('strong.monthly').html('&#8358; ' + addCommas(ddays.toFixed(2)));
        $('strong.days').html(tenor + ' Months');
        
        $("input#credit").val(principal);
        $("input#duration").val(tenor);
        $("input#pay").val(salary);

        $("input#installments").val(addCommas(ddays.toFixed(2)) /*+ " for " + tenor + " Month(s)"*/);
        /*
        setTimeout(
        function(){
            $('.input2').slider('refresh');
            $('.input1').slider('refresh');
        },1000
        );*/
    }
    
    

      
