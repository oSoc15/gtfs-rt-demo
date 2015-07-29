/**
 * Created by timtijssens on 29/07/15.
 */


var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var express = require('express');
var app = express();

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




app.get('/servicesAlerts', function (req, res) {

    request(requestSettingsServiceAlerts, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var feed = GtfsRealtimeBindings.FeedMessage.decode(body);


            //console.log(feed.entity[0]);
            feed.entity.forEach(function(entity) {
                 res.write(JSON.stringify(entity));
                console.log(entity.alert.header_text.translation[0]);

            });
        }
    });
});

app.get('/tripUpdates', function (req, res) {

    request(requestSettingsTripUpdates, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var feed = GtfsRealtimeBindings.FeedMessage.decode(body);

            feed.entity.forEach(function(entity) {
                res.write(JSON.stringify(entity));
                if (entity.trip_update) {
                    console.log(entity.trip_update);
                }
            });
        }
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
