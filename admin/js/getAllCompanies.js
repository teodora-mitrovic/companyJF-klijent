/* GET ALL COMPANIES */

function companyButton(company) {
   
	$('<a/>', {
    	
    	'id': 'company_'+company.id
    }).appendTo($('.select-company'));

    $('<input/>', {
    	'type': 'button',
    	'value': company.name,
    	'id': company.email,
    	'class': 'pass-modal-btn'
    }).appendTo($('#company_'+company.id));

    
}

function populateCompanies(companies) {
	for(var i=0; i<companies.length; i++) {
		companyButton(companies[i]);
	}


}

function allCompanies(){

		const URL="https://cv.brain.rs/api/company/getAll";

        var token = sessionStorage.getItem('token');

		$.ajax({
			 
			  type: "GET",
			  url: URL,
			  beforeSend: function (xhr) {
					    xhr.setRequestHeader('Authorization', 'Bearer '+token);
			  },
			  success: function(resp){ 

				  	// display all company names	
				console.log(resp.companies);	
				populateCompanies(resp.companies);

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
				  		form.reset();
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

	allCompanies();


})