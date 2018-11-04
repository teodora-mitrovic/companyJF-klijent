/* GET ALL COMPANIES */

function populateSelect(id, array) {
	var option='';
	for(var i=0; i<array.length; i++){
		option+='<option value="'+ array[i].name + '" id="'+ array[i].email + '">' + array[i].name + '</option>';
	}

	$(id).append(option);
}



$(document).ready(function(){

	//



	$("#companies_button").click(function(e){

		const URL="https://cv.brain.rs/api/company/getAll";


		e.preventDefault();
        e.stopPropagation();
        var token = sessionStorage.getItem('token');

		$.ajax({
			 
			  type: "GET",
			  url: URL,
			  beforeSend: function (xhr) {
					    xhr.setRequestHeader('Authorization', 'Bearer '+token);
			  },
			  success: function(resp){ 

				  	// display all company names	
				populateSelect('#companies', resp.companies);

			  },
			  complete: function(xhr){
			  	sessionStorage.removeItem('token');
	  			sessionStorage.setItem('token', xhr.getResponseHeader('Authorization').split(' ')[1]);
				$("#passwordModal").modal('show');	
			  	
			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown){

			  	sessionStorage.removeItem('token');
	  			sessionStorage.setItem('token', XMLHttpRequest.getResponseHeader('Authorization').split(' ')[1]);
	  			

			  	switch(XMLHttpRequest.status) {

			  		case 401:
				  		form.reset();
				  		$('#info-companies').text("Neautorizovani pristup");
				  		$('#info-companies').show(0);
				  		break;
				  	case 500:
				  		$('#info-companies').text("Greška na serveru, molimo pokušajte ponovo");
				  		$('#info-companies').show(0);
				  		
				  		break;

			  	}
			 
			}


		});



	});




})