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



	$("#change_password_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var password=$('#new_password').val().trim();
        var confirmed_password=$('#confirmed_password').val().trim();


        
        if(confirmPassword(password, confirmed_password)){
        	
        	var token=sessionStorage.getItem('token');
			var email=$('#companies option:selected').attr('id');
			console.log(email);



			jsonData={};
			jsonData['new_password']=password;


			const URLlogin="https://cv.brain.rs/api/company/changePassword/"+email;

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

				  
				  		var form=document.getElementById('change_password_form');
					  	form.reset();
					  	alert("Lozinka uspesno promenjena");

				  	
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
				  			alert("Greška prilikom izmene lozinke!");
				  			break;
				  	}
			
				}


			});
        }

        else {
        	alert("Ponovo potvrdite novu lozinku!");
        }

	
	});




})