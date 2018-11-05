/* LOGIN */

$(document).ready(function(){

	//
	const URLlogin="https://cv.brain.rs/api/login";

	$("#login_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var user=$('#email').val().trim();
		var pass=$('#password').val().trim();

		
		var jsonData = {};
		jsonData["email"]=user;
		jsonData["password"]=pass;
		
		

		$.ajax({
			  headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
    		  },
    		  
			  type: "POST",
			  url: URLlogin,
			  dataType: "json",
			  data: JSON.stringify(eval(jsonData)),

			  success: function(resp){ 

			  	
				  	var form=document.getElementById('login_form');
				  	form.reset();
				  	sessionStorage.setItem('email', resp.data.email);
				  	sessionStorage.setItem('token', resp.data.token);
				  	sessionStorage.setItem('user_type', resp.data.user_type);

		  			window.location.href = "home/";
			  	
	
			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown){

			  	var form=document.getElementById('login_form');
			  	
			  	switch(XMLHttpRequest.status) {

			  		case 401:
				  		form.reset();
				  		$('#info-login').text("Netačni kredencijali");
				  		$('#info-login').show(0);
			  			alert('Neodgovarajući kredencijali!');

				  		break;
				  	case 500:
				  		form.reset();
				  		alert('Greska na serveru, molimo pokušajte ponovo');
				  		break;

			  	}

			  	
			  	

			 
			}


		});



	});




})