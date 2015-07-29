/**
 * Created by timtijssens on 29/07/15.
 */


var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettingsTripUpdates = {
    method: 'GET',
    url: 'http://irail.gent/trip_updates.pb',
    encoding: null
};
var requestSettingsServiceAlerts = {
    method: 'GET',
    url: 'http://irail.gent/service_alerts.pb',
    encoding: null
};
/*
request(requestSettingsTripUpdates, function (error, response, body) {

    if (!error && response.statusCode == 200) {

        var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
        console.log(feed);
        console.log(feed.entity[0]);
        feed.entity.forEach(function(entity) {
            console.log("Lolsnor");
            console.log(entity);
            if (entity.trip_update) {
                console.log(entity.trip_update);
            }
        });
    }
});
*/
request(requestSettingsServiceAlerts, function (error, response, body) {

    if (!error && response.statusCode == 200) {

        var feed = GtfsRealtimeBindings.FeedMessage.decode(body);


        //console.log(feed.entity[0]);
        feed.entity.forEach(function(entity) {

            console.log(entity.alert.header_text.translation[0]);
            if (entity.trip_update) {
                console.log(entity.trip_update);
            }
        });
    }
});
