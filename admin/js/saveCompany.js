/* REGISTER COMPANY*/


$(document).ready(function(){


	$("#register_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		const URL="https://cv.brain.rs/api/company/register";
		var token = sessionStorage.getItem('token');
		
		var jsonData = {};
		jsonData["email"]=$('#email').val().trim();;
		jsonData["password"]=$('#pass').val().trim();;
		jsonData["name"]=$('#name').val().trim();
		

		$.ajax({
			  headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
    		  },
    		  beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer '+token);
			  },
    		   
			  type: "POST",
			  url: URL,
			  dataType: "json",
			  data: JSON.stringify(eval(jsonData)),

			  success: function(){ 

			  	
			  		var form=document.getElementById('register_form');
			  		form.reset();
					//close modal
					
					$('#info-register-company').text('Uspešno sačuvana kompanija!');
			  	
			  		
			  },
			  complete: function(xhr) {
			  	sessionStorage.removeItem('token');
	  			sessionStorage.setItem('token', xhr.getResponseHeader('Authorization').split(' ')[1]);
			  
			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown){
			  	sessionStorage.removeItem('token');
	  			sessionStorage.setItem('token', XMLHttpRequest.getResponseHeader('Authorization').split(' ')[1]);
			  
			  	switch(XMLHttpRequest.status) {
			  		case 500:
						$('#info-register-company').text('Greška prilikom registrovanja kompanije!');
						$('#info-register-company').css('color', 'red');

			  			break;
			  		case 401:
			  			$('#info-register-company').text('Došlo je do greške prilikom autorizacije');
						$('#info-register-company').css('color', 'red');

			  			break;
			  		case 403:
			  			$('#info-register-company').text('Email je već zauzet, unesite drugi!');
						$('#info-register-company').css('color', 'red');


			  	}
			  	
			  }



		}); 



	});




})