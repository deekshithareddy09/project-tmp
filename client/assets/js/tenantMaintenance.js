$("#maintenanceSubmit").click(function(){
		$('#cost').text('');
	    $.post("/api/maintenance",
	    {
	        id: window.username || 'demo@gmail.com',
	        type: $('#maintenanceType')[0].value,
			location: $("#maintenanceLocation")[0].value,
	        descritpion: $("#descriptionOfProblem").val(),
	        date: $('#maintRegDate').valueAsNumber
	    },
	    function(data, status){
	    	console.log(data);
	    	var cost;
	    	if(Array.isArray(data)) {
	    		cost = data[0].cost;
	    	} else {
	    		cost = data.cost;
	    	}

	    	if(!cost) {
	    		cost = 100;
	    	}
	    	$('#cost').text(cost);
	    	// $('#invalidLogin').hide();
	     //    window.location.href = "/dashboard.html"
	    }).fail(function(response) {
	    	console.log(response);
    		// $('#invalidLogin').show();
		});
	});