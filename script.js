/**
 * Created by timtijssens on 29/07/15.
 */


var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var express = require('express');
var app = express();
app.use('/', express.static('public'));
fs = require('fs');

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

request(requestSettingsServiceAlerts, function (error, response, body) {

    if (!error && response.statusCode == 200) {

        var feed = GtfsRealtimeBindings.FeedMessage.decode(body);

        fs.writeFile('service_alerts.json', JSON.stringify(feed), function (err) {
            if (err) return console.log(err);
            //console.log('Hello World > helloworld.txt');
        });
        //console.log(feed.entity[0]);

    }
});
request(requestSettingsTripUpdates, function (error, response, body) {

    if (!error && response.statusCode == 200) {

        var feed = GtfsRealtimeBindings.FeedMessage.decode(body);

        fs.writeFile('trip_updates.json', JSON.stringify(feed), function (err) {
            if (err) return console.log(err);
            //console.log('Hello World > helloworld.txt');
        });
        //console.log(feed.entity[0]);

    }
});





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
