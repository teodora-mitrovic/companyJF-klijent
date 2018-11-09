/* CHANGE PASSWORD */

function confirmPassword(password, confirmed_password){
	if(password==confirmed_password){
		return true;
	}

	else{
		return false;
	}
}
 



$(document).ready(function(){



	$("#change_password_admin_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var password=$('#new_password').val().trim();
        var confirmed_password=$('#confirmed_password').val().trim();


        
        if(confirmPassword(password, confirmed_password)){
        	
        	var token=sessionStorage.getItem('token');
			var email=sessionStorage.getItem('email');
			

			jsonData={};
			jsonData['old_password']=$('#old_password').val();
			jsonData['new_password']=$('#new_password').val();


			const URLlogin="https://cv.brain.rs/api/admin/changePassword/"+email;

			$.ajax({
				  headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
	    		  },
	    		  beforeSend: function (xhr) {
					    xhr.setRequestHeader('Authorization', 'Bearer '+token);
				  },
				  type: "POST",
				  url: URLlogin,
				  dataType: "json",
				  data: JSON.stringify(eval(jsonData)),

				  success: function(resp){ 

				  
				  		var form=document.getElementById('change_password_admin_form');
					  	form.reset();
					  	$('#info-pass-admin').text("Lozinka uspesno promenjena!");

				  	
				  },
				  complete: function(xhr){
			  		sessionStorage.removeItem('token');
		  			sessionStorage.setItem('token', xhr.getResponseHeader('Authorization').split(' ')[1]);
		  				
				  },
				  error: function(XMLHttpRequest, textStatus, errorThrown){
				  	sessionStorage.removeItem('token');

	  				sessionStorage.setItem('token', XMLHttpRequest.getResponseHeader('Authorization').split(' ')[1]);
	  			

				  	switch(XMLHttpRequest.status) {
				  		case 500:
				  			var form=document.getElementById('change_password_admin_form');
						  	form.reset();
					  		$('#info-pass-admin').text("Greška, molimo Vas pokušajte ponovo");
					  		$('#info-pass-admin').css('color', 'red');


				  			break;
				  		case 404:
				  			var form=document.getElementById('change_password_admin_form');
					  		$('#info-pass-admin').text("Pogrešno uneta stara lozinka");
					  		$('#info-pass-admin').css('color', 'red');


						  	form.reset();
				  			break;
				  	}
			
				}


			});
        }

        else {
        	
			$('#info-pass-admin').text("Ponovo potvrdite novu lozinku!");
			$('#info-pass-admin').css('color', 'red');


        }

	
	});




})