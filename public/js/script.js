/**
 * Created by timtijssens on 29/07/15.
 */


$(document).ready(function(){
console.log('Hi there');

    $.ajax({url: "http://localhost:3000/service_alerts.json", success: function(result){
        console.log('Hi data');
       console.log(result.header);
       parseServiceAlertData(result);
    }});
    $.ajax({url: "http://localhost:3000/trip_updates.json", success: function(result){
        console.log('Hi data');
        console.log(result.header);
        parseTripUpdateData(result);
    }});

    function parseServiceAlertData(result){


        console.log(result.entity.length);
        for( i = 0 ;i <= result.entity.length; i++){


            $(".servicesUpdate").append(" <tr>"+
                "<td>"+
                result.entity[i].alert.header_text.translation[0].text+
                "</td>"+
                "<td>"+
                result.entity[i].alert.description_text.translation[0].text+
                "</td>"+
                "<td>"+
                '<a href="' +result.entity[i].alert.url.translation[0].text + '">Details</a></td>'+



                "</tr>");

        }
    }
    function parseTripUpdateData(result){
        console.log("Miaauw i am a trip");

        console.log(result.entity.length);
        var totalAmountofTrainsHavingIssues = result.entity.length;
        var totalTrains = 2986;
        var percentageOfDelays = (totalAmountofTrainsHavingIssues / totalTrains ) *100 ;
        percentageOfDelays =  percentageOfDelays.toFixed(2);



        $( ".extraInfo" ).append("Number of Trains having issues "+ totalAmountofTrainsHavingIssues );
        $( ".extraInfo" ).append(" <h2>Percentage of delays " +percentageOfDelays+"%</h2>");



        for( i = 0 ;i <= result.entity.length; i++){


            var routeId = result.entity[i].trip_update.trip.route_id;
            var reslt = routeId.split(":");
            console.log(reslt[1]);
            var totalDelay=0;



            try {
                  for( t = 0 ;t <= result.entity[i].trip_update.stop_time_update.length; t++){
                 totalDelay += result.entity[i].trip_update.stop_time_update[t].arrival.delay;


                    console.log(totalDelay);




                  }





            }catch (err){

            }

            totalDelay = totalDelay/60;
            totalDelay = Math.round(totalDelay *100) /100;
            if(totalDelay ==0){
                totalDelay ="Cancelled"
            }


            $( ".tripupdates" ).append( " <tr>"+
                "<td>"+
                reslt[1]+
                "</td>"+
                "<td>"+
               totalDelay+
                "</td>"+




                "</tr>");



           // console.log(" i am an awesome cat "  + result.entity[i].alert.header_text.translation[0].text);


        }
    }
});