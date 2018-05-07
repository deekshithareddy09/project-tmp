$(document).ready(function () {
	$('#invalidReg').hide();
	$('#regSuccess').hide();
	$("#regBtn").click(function(){
		    $.post("/api/signup",
		    {
		        username: $('#regEmail').val(),
		        password: $('#regPwd').val()
		    },
		    function(data, status){
		    	debugger;
		    	$('#regFail').hide();
		    	$('#regSuccess').show();
		    }).fail(function(response) {
		    	debugger;
	    		$('#invalidReg').show();
		    	$('#regSuccess').hide();
			});
	});
	$("#signupClose").click(function(){

		window.location.href="#login";

	});
});



