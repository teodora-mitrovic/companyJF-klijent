/* GET COMPANY INFO */

function companyInfo(){


        var token = sessionStorage.getItem('token');
        var email = sessionStorage.getItem('email');

		const URL="https://cv.brain.rs/api/admin/getInfo/"+email;


		$.ajax({
			 
			  type: "GET",
			  url: URL,
			  beforeSend: function (xhr) {
					    xhr.setRequestHeader('Authorization', 'Bearer '+token);
			  },
			  success: function(resp){ 

				  	// display all company names
				console.log(resp);	
				$('#nameAdmin').text(resp.admin.name+" "+resp.admin.surname);
				$('#positionAdmin').text(resp.admin.position);


			  },
			  complete: function(xhr){
			  	sessionStorage.removeItem('token');
	  			sessionStorage.setItem('token', xhr.getResponseHeader('Authorization').split(' ')[1]);
			  	
			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown){

			  	sessionStorage.removeItem('token');
	  			sessionStorage.setItem('token', XMLHttpRequest.getResponseHeader('Authorization').split(' ')[1]);
	  			

			  	switch(XMLHttpRequest.status) {

			  		case 401:
				  		$('#info-companies').text("Neautorizovani pristup");
				  		$('#info-companies').show(0);
				  		break;
				  	case 500:
				  		$('#info-companies').text("Došlo je do greške, molimo pokušajte ponovo");
				  		$('#info-companies').show(0);
				  		
				  		break;

			  	}
			 
			}


		});



	};



$(document).ready(function(){

	companyInfo();



})