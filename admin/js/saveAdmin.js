
/* REGISTER ADMIN */


$(document).ready(function(){


	$("#register_admin_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		const URL="https://cv.brain.rs/api/admin/register";
		var token = sessionStorage.getItem('token');
		
		var jsonData = {};
		jsonData["email"]=$('#emailAdmin').val().trim();;
		jsonData["password"]=$('#passAdmin').val().trim();;
		jsonData["name"]=$('#nameAdmin').val().trim();
		jsonData["surname"]=$('#surnameAdmin').val().trim();
		jsonData["position"]=$('#positionAdmin').val().trim();


		

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

			  		var form=document.getElementById('register_admin_form');
			  		form.reset();
					//close modal
					$('#info-register-admin').text("Admin uspešno dodat");
			  	
			  		
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
			  			var form=document.getElementById('register_admin_form');
			  			form.reset();
						$('#info-register-admin').text("Greška prilikom registrovanja admina!");
						$('#info-register-admin').css('color', 'red');


			  			break;
			  		case 401:
			  			var form=document.getElementById('register_admin_form');
			  			form.reset();
						$('#info-register-admin').text("Doslo je do greske prilikom autorizacije");
						$('#info-register-admin').css('color', 'red');
						
			  			break;
			  		case 403:
			  			var form=document.getElementById('register_admin_form');
			  			form.reset();
						$('#info-register-admin').text("Email je zauzet, unesite drugi");
						$('#info-register-admin').css('color', 'red');

						break;
			  			

			  	}
			  	
			  }



		}); 



	});




})