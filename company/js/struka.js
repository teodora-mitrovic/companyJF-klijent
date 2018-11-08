$(function(){
	
	$('.select-university ').on('click', '.notSelected', function(){

		$(this).addClass('selectedUniversity');
		$(this).removeClass('notSelected');
		
		var universityName = $(this).attr('name');
		var universityValue = $(this).attr('value');

		
		var displayed = $('#card-faculty').css('display');
		console.log(displayed);
		if(displayed=='none') {
			$('#card-faculty').css('display', 'block');
		}

		
		universityValueTrimmed = universityValue.replace(/\s+/g,'');

		$('<div/>', {
			class: "col-12",
			id: universityValueTrimmed
		}).appendTo('.select-faculty');

		
		$('<h5/>', {
				text: universityValue,
				class: "col-12"
		}).appendTo('#'+universityValueTrimmed);
			

		for (var i = 0; i < faculties[universityName].length; i++) {

			$('<input/>', {
				type: "button",
				name: faculties[universityName][i],
				id: [universityValue]+'_'+i,
				value: faculties[universityName][i],
				class: universityValue
			}).appendTo('#'+universityValueTrimmed);
			
		
		}

	});

	$('.select-university').on('click', '.selectedUniversity', function(){

		$(this).removeClass('selectedUniversity');
		$(this).addClass('notSelected');
		var value = $(this).val();
		value = value.replace(/\s+/g,'');

		//remove faculties from faculty part from removed university

		$('#'+value).remove();


	})


	$('.company').on('click', '.select-faculty input', function(){
		$(this).addClass('selectedFaculty');
	});

	$('.company').on('click', '.selectedFaculty', function(){
		$(this).removeClass('selectedFaculty');
	});

	



	


})