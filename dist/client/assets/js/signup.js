$("#regBtn").click(function(){
	    $.post("/api/signup",
	    {
	        username: $('#regEmail').val(),
	        password: $('#regPwd').val()
	    },
	    function(data, status){
	    	$('#invalidReg').hide();
	    	$('#regSuccess').show();
	    }).fail(function(response) {
    		$('#invalidReg').show();
	    	$('#regSuccess').hide();
		});
	});