$(function(){
	
	$('.select-university input').bind('click', function(){

		$(this).addClass('selectedUniversity');
		
		var universityName = $(this).attr('name');
		var universityValue = $(this).attr('value');

		
		var displayed = $('#card-faculty').css('display');
		console.log(displayed);
		if(displayed=='none') {
			$('#card-faculty').css('display', 'block');
		}

		
		$('<h5/>', {
				text: universityValue,
				class: "col-12"
		}).appendTo('.select-faculty');
			

		for (var i = 0; i < faculties[universityName].length; i++) {

			$('<input/>', {
				type: "button",
				name: faculties[universityName][i],
				id: [universityValue]+'_'+i,
				value: faculties[universityName][i],
			}).appendTo('.select-faculty');
			
		
		}

	});


	$('.company').on('click', '.select-faculty input', function(){
		$(this).addClass('selectedFaculty');
	});


})