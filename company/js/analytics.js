   
    function studije(osnovne, master, doktorske) {

        var data = google.visualization.arrayToDataTable([
        ['Studije', 'stepen'],
        ['Osnovne', osnovne],
        ['Master', master],
        ['Doktorske', doktorske]
        ]);

        var options = {'title':'Stepen Studija', 'width':550, 'height':400};

        var chart = new google.visualization.PieChart(document.getElementById('studije'));
        chart.draw(data, options);
    }

    function prosek(six, sixHalf, seven, sevenHalf, eight, eightHalf, nine, nineHalf) {
        var moreData = google.visualization.arrayToDataTable([
        ['Prosek', 'Ocena'],
        ['6.00 - 6.50', six],
        ['6.50 - 7.00', sixHalf],
        ['7.00 - 7.50', seven],
        ['7.50 - 8.00', sevenHalf],
        ['8.00 - 8.50', eight],
        ['8.50 - 9.00', eightHalf],
        ['9.00 - 9.50', nine],
        ['9.50 - 10.00', nineHalf]
        ]);

        var prosek = {'title':'Prosecna ocena', 'width':550, 'height':400};
        var chart = new google.visualization.PieChart(document.getElementById('prosek'));
        chart.draw(moreData, prosek);
    }

    function analytics() {
        const URL = "https://cv.brain.rs/api/student/analytics";
        var token = sessionStorage.getItem('token');

        $.ajax({
             
              type: "GET",
              url: URL,
              beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer '+token);
              },
              success: function(resp){ 


                studije(resp.osnovne_br, resp.master_br, resp.doktorske_br);
                prosek(resp.six, resp.sixHalf, resp.seven, resp.sevenHalf, 
                        resp.eight, resp.eightHalf, resp.nine, resp.nineHalf);

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
    }

    
    $(document).ready(function(){
     google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback();  
    analytics();




    });


