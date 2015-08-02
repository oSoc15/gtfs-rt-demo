/**
 * Created by timtijssens on 29/07/15.
 */


$(document).ready(function(){
console.log('Hi there');

    $.ajax({url: "/service_alerts.json", success: function(result){
        console.log('Hi data');
       console.log(result.header);
       parseServiceAlertData(result);
    }});
    $.ajax({url: "/trip_updates.json", success: function(result){
        console.log('Hi data');
        console.log(result.header);
        parseTripUpdateData(result);
    }});

    window.setInterval(function() {
        console.log('Hi Minute');

        $.ajax({url: "/service_alerts.json", success: function(result){
            parseServiceAlertData(result);
        }});
        $.ajax({url: "/trip_updates.json", success: function(result){
            parseTripUpdateData(result);
        }});



    }, 1000 * 60 * 1); // where X is your every X minutes

    function parseServiceAlertData(result){

        $( ".servicesUpdate" ).html("");
        console.log('Refresh Service Update');


        for( i = 0 ;i <= result.entity.length; i++){
            //console.log(result.entity[i].alert.header_text.translation[0].text);


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
        var totalAmountofTrainsHavingIssues = result.entity.length;
        var totalTrains = 2986;
        var percentageOfDelays = (totalAmountofTrainsHavingIssues / totalTrains ) *100 ;
        percentageOfDelays =  percentageOfDelays.toFixed(2);

        $( ".extraInfo").html("");

        $( ".extraInfo" ).append('<h2>Number of Trains having issues <span class="btn-danger">  '+ totalAmountofTrainsHavingIssues + "  </span></h2>" );
        $( ".extraInfo" ).append(" <h2>Percentage of delays " +percentageOfDelays+"%</h2>");
        $( ".tripupdates" ).html("");


        for( i = 0 ;i <= result.entity.length; i++){



            var routeId = result.entity[i].trip_update.trip.route_id;
            var routeLabel = result.entity[i].trip_update.vehicle.label;
            //console.log(routeLabel);
            var reslt = routeId.split(":");

            var totalDelay=0;
            try {



                  for( t = 0 ;t <= result.entity[i].trip_update.stop_time_update.length; t++){
                 totalDelay += result.entity[i].trip_update.stop_time_update[t].arrival.delay;

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
                routeLabel+
                "</td>"+
                "<td>"+
               totalDelay+
                "</td>"+
                "</tr>");
        }
    }
});
