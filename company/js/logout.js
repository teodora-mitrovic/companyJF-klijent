/* LOGOUT */

$(document).ready(function(){



	$("#logout").click(function(e){

		e.preventDefault();
        e.stopPropagation();

		const URLlogin="https://cv.brain.rs/api/logout";

			  	
        var token = sessionStorage.getItem('token');
        console.log(token);

		$.ajax({
			  
			  type: "GET",
			  url: URLlogin,
			  beforeSend: function (xhr) {
				    xhr.setRequestHeader('Authorization', 'Bearer '+token);
			  },
			  success: function(data){ 

			  	sessionStorage.removeItem('token');
			  	sessionStorage.removeItem('email');

	  			window.location.href = "../../index.html";
			  		
			  },
			  
			  error: function(XMLHttpRequest, textStatus, errorThrown){
			  
			  		
			  		alert("Greska!");
			  		window.location.href="../../index.html";
	
			  }



		});



	});




})




