$(document).ready(function(){
	
	checkToken();
	

})

function checkToken() {
	if(sessionStorage.getItem('token')==null){
		alert('Da biste videli ovu stranicu, molimo Vas da se ulogujete');
		window.location.href="index.html";
	}
}