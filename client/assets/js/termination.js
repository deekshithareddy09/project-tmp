$("#terminationSubmit").click(function(){
	    $.post("/api/termination",
	    {
	        id: window.username || 'demo@gmail.com',
	        type: $('#termination_reason').val(),
	        priordays: $('#text-input').val()
	    },
	    function(data, status){
	    	window.data=data;
	    	console.log(data);
	    	var fine;
	    	var type;
	    	if(Array.isArray(data)) {
	    		fine = data[0].fine;
	    		type = data[0].type;
	    	} else {
	    		fine = 2000;
	    	}

	    	if(!fine) {
	    		fine = 2000;
	    	}
	    	$('#fine').text(fine);
	    	$('#type').text(type);
	    	// $('#invalidLogin').hide();
	     //    window.location.href = "/dashboard.html"
	    }).fail(function(response) {
	    	console.log(response);
    		// $('#invalidLogin').show();
		});
	});