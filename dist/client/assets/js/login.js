$('#invalidLogin').hide();
$("#loginBtn").on('click',function(){
	    $.post("/api/login",
	    {
	        username: $('#email').val(),
	        password: $('#password').val()
	    },
	    function(data, status){
	    	$('#invalidLogin').hide();
	    	window.username = $('#email').val();
	        window.location.href = "#dashboard"
	    }).fail(function(response) {
    		$('#invalidLogin').show();
		});
});