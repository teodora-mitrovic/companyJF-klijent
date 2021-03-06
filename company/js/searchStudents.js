
function noCriteriaSelected(jsonData) {
    cv = jsonData['cv'].length;
    licence = jsonData ['licence'].length;
    faculties = jsonData['faculties'].length;
    studies = jsonData['studies'].length;
    grades = jsonData['grades'].length;
    sex = jsonData['sex'].length;
    lang = jsonData['languages'].length;
    if(cv == 0 && licence == 0 && faculties == 0 && studies == 0 && grades == 0 && sex == 0 && lang == 0){
        return true;
    }
    return false;
}




function linkedinProfile (linkedin) {
    if(linkedin!=null){
        return "block";

    }
    else{
        return "none";
    }

}

function yearOfStudies(year) {
    if(year==null){
        return "";
    }
    else return year;
}


function cvDownloadButton(resp){
    if(resp.hasCV){
        return true;
    }
    return false;
}



function studentProfile(student, number) {

        var year=yearOfStudies(student.year_of_studies);
        var linkedin=linkedinProfile(student.linkedin);
        

        $('<div/>',{
            class: 'card',
            id: 'card'+number
        }).appendTo('#accordion');

    
        $('<div/>',{
            id: 'heading'+number,
            class: 'card-header'
        }).appendTo('#accordion #card'+number);

        var el = '#accordion #card'+number+' #heading'+number;
        $('<a/>',{
            'class': "btn",
            'data-toggle': "collapse",
            'data-target' : "#collapse"+number,
            'aria-expanded' : "true", 
            'aria-controls' : "collapse"+number,
            html : '<ul class="row"><li class="col-4"><i class="fas fa-bars"></i> ' +' ' +student.name+' '+student.surname+'</li><li class="col-5">' + student.faculty + '</li><li class="col-3"> <p class="profileView" title="Pregledaj profil"><i class="fas fa-user"></i> Pregledaj profil</p> </li></ul>'
        }).appendTo(el);

        $('<div/>',{
            'id' : "collapse"+number ,
            'class' :"collapse",
            'aria-labelledby': "heading"+number, 
            'data-parent': "#accordion"
        }).appendTo('#accordion #card'+number);

        
        var div = document.createElement('div');
        div.setAttribute('class', 'card-body row student');
        div.setAttribute('id', 'student_'+number);
        div.innerHTML = `<div class="col-3" style="text-align:center">
                            <div id="profile-img" style="background-image:url('${student.img_link}')" title="${student.name} ${student.surname}">
                                
                            </div>
                            <h4 style="color:#F08E39">
                                __
                            </h4>
                            <a id="linkedin-info" style="display:${linkedin}" target="_blank" href="${student.linkedin}" title="${student.name} ${student.surname}">
                               <i class="fab fa-linkedin fa-2x"></i>
                            </a>
                        </div>
                        <div id="infoSection" class="col-9 left">
                            <h4 style="color:#F08E39">
                                Osnovne Informacije
                            </h4>
                            <h6 class="basic-info-text">Ime i Prezime | <span id="nameSurname">${student.name} ${student.surname}</span></h6>
                            <h6 class="basic-info-text">Email Adresa | <span id="email-info">${student.login.email}</span></h6>
                            <h6 class="basic-info-text">Datum Rođenja | <span id="date-info">${student.birth_date}</span></h6>
                            <h6 class="basic-info-text">Pol | <span id="sex-info">${student.sex}</span></h6>
                            <h4 style="color:#F08E39; margin:20px 0">
                                Obrazovanje
                            </h4>
                            <h6 class="basic-info-text">Univerzitet | <span id="university-info">${student.university}</span></h6>
                            <h6 class="basic-info-text">Fakultet | <span id="faculty-info">${student.faculty}</span> </h6>
                            <h6 class="basic-info-text">Stepen studija | <span id="degree-of-studies-info">${student.degree_of_studies}</span></h6>
                            <h6 class="basic-info-text">Smer | <span id="module-info"></span>${student.module}</h6> 
                            <h6 class="basic-info-text" id="year-info">Godina | <span>${year}</span></h6>
                            <h6 class="basic-info-text hidden" id="status-info">Status studija | <span>${student.finished}</span></h6>
                            <h6 class="basic-info-text">Prosečna ocena | <span id="grade-info">${student.grade}</span></h6>
                            <h4 style="color:#F08E39; margin:20px 0">
                                Ostale Informacije
                            </h4>
                            <h6 class="basic-info-text">Jezici | <span id="languages-info">${student.lang}</span></h6>
                            <h6 class="basic-info-text">Vozačka dozvola B kategorije | <span id="licence-info">${student.driving_licence}</span></h6>
                            <h4 style="color:#F08E39; margin:20px 0">
                                __
                            </h4>
                            <div id="cvButton${number}">

                            </div>
                        </div>`;

            var button = document.createElement('button');
            var appendToProfile = '#accordion #card'+number+' #collapse'+number;
            $(div).appendTo($(appendToProfile));

            if(cvDownloadButton(student)){
                button.setAttribute('type', 'button');
                button.setAttribute('class', 'btn dark-button button-large cv-button');
                button.innerHTML=`<a download target="_blank" href="${student.cv.link}" title="${student.name} ${student.surname}">Preuzmite CV</a>`;
                
                $(button).appendTo($('#cvButton'+number));
            }

        // all info about student should be appended to row

}


$(function(){
    
    $('#search-btn').bind('click', function(){

        $(this).prop('disabled', true);
        $('#searching_text').css('display','inline');


        var token = sessionStorage.getItem('token');
        jsonData = {};
        var faculties = [];
        var universities = [];
        var languages = [];
        var degreeOfStudies = [];
        var grades = [];
        var sex = [];
        var cv = [];
        var licence = [];


        //faculties

        $('.selectedUniversity').each(function(){

            var university = $(this).attr('value');
            universities.push("nofaculty_"+university);
        })

        $('.selectedFaculty').each(function(){
            var faculty = $(this).attr('value');
            var university = $(this).attr('id').split('_')[0];
            faculties.push(faculty+"_"+university);
        })
        
        //languages
        
        $('.languages').each(function(){
            if($(this).prop('checked')) {
                var name = $(this).attr('name');
                languages.push(name);
            }
        }) 

        // grade
        $('.grade').each(function(){
            if($(this).prop('checked')) {
                var val = $(this).attr('name');
                grades.push(val);
            }
        })

        //sex 
        $('.sex').each(function(){
            if($(this).prop('checked')) {
                var val = $(this).attr('name');
                sex.push(val);
            }
        })

        
        // 
        $('.osnovneStudije').each(function(){
            if($(this).prop('checked')){
                if($(this).attr('name')=='Završene'){
                    degreeOfStudies.push("Osnovne studije_"+$(this).attr('name')+"_finished");
                }
                else {
                    degreeOfStudies.push("Osnovne studije_"+$(this).attr('name')+"_year");

                }

            }
        })

        // 
        $('.master').each(function(){
            if($(this).prop('checked')){
                degreeOfStudies.push("Master studije_"+$(this).attr('name')+"_finished");
            }
        })


        //
        $('.doktorske').each(function(){
            if($(this).prop('checked')){
                degreeOfStudies.push("Doktorske studije_"+$(this).attr('name')+"_finished");

            }
        })

        $('.cv').each(function(){
            if($(this).prop('checked')) {
                cv.push($(this).val());
            }
        })

        $('.licence').each(function(){
            if($(this).prop('checked')) {
                licence.push($(this).val());
            }
        })

        if(faculties.length==0){
            jsonData['faculties'] = universities;
        }
        else {
            jsonData['faculties']=faculties;

        }
        //licence
        jsonData['cv']=cv;
        jsonData['licence']=licence;
        jsonData['languages']=languages;
        
        jsonData['studies']=degreeOfStudies;
        jsonData['grades']=grades;
        jsonData['sex']=sex;

        var URL="";
        if(noCriteriaSelected(jsonData)) {

            URL = "https://cv.brain.rs/api/student/getAll";
        }
        else {

            URL = "https://cv.brain.rs/api/student/search";
        }

        console.log(jsonData);

        $.ajax({

            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            beforeSend: function (xhr){
                 xhr.setRequestHeader('Authorization', 'Bearer '+token);
            },
              
            type: "POST",
            url: URL,
            dataType: "json",
            data: JSON.stringify(eval(jsonData)),

            success: function(resp) {

                
                //console.log(resp.student);

                $('#searching_text').css('display','none');
                $('#search-btn').css('display', 'none');

                // call studentProfile(student) for every student
                $('#accordion').empty();
                for(var i=0; i<resp.student.length; i++) {
                    studentProfile(resp.student[i], resp.student[i].id);

                }


            },
            complete: function(xhr) {
                sessionStorage.removeItem('token');
                sessionStorage.setItem('token', xhr.getResponseHeader('Authorization').split(' ')[1]);
                        
            },
            error: function (xhr, textStatus, errorThrown) {
                sessionStorage.removeItem('token');
                sessionStorage.setItem('token', xhr.getResponseHeader('Authorization').split(' ')[1]);
                        
            }

       })  
    })
        
    

});