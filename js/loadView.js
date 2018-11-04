function loadView() {
	var role = sessionStorage.getItem('user_type');

	if(role=="admin") {
		$('.company').css('display', 'none');
	}
	else {
		$('.admin').css('display', 'none');

	}
}


$(document).ready(function () {


	loadView();


})