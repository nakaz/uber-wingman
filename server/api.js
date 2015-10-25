var router  = require('express').Router(),
    request = require('request');

var uberApiUrl       = 'https://api.uber.com/v1',
    uberClientId     = process.env.UBER_CLIENT_ID,
    uberClientSecret = process.env.UBER_CLIENT_SECRET,
    uberServerToken  = process.env.UBER_SERVER_TOKEN,
    bearerToken      = null;

var googleApiUrl      = 'https://maps.googleapis.com/maps/api',
    googleServerToken = process.env.GOOGLE_SERVER_TOKEN;

router.get('/estimates/price', function(req, res){
  var start_latitude = 21.308507;
  var start_longitude = -157.818326;
  var end_latitude = 21.307977;
  var end_longitude = -157.8088867;

  request.get({
    url : uberApiUrl + '/estimates/price',
    qs : {
      server_token : uberServerToken,
      start_latitude : start_latitude,
      start_longitude : start_longitude,
      end_latitude : end_latitude,
      end_longitude : end_longitude
    }
  }, function(err, response, body) {
    if(err) {
      return res.json(err);
    }
    var results = JSON.parse(body);
    res.json(results);
  });
});

router.get('/estimates/time', function(req, res){
  var start_latitude = 21.308507;
  var start_longitude = -157.818326;

  request.get({
    url : uberApiUrl + '/estimates/time',
    qs : {
      server_token : uberServerToken,
      start_latitude : start_latitude,
      start_longitude : start_longitude
    }
  }, function(err, response, body) {
    if(err) {
      return res.json(err);
    }
    var results = JSON.parse(body);
    res.json(results);
  });
});

router.get('/me', function(req, res){
  var first_name = first_name;
  var last_name = last_name;
  var email = email;
  var picture = picture;
  var promo_code = promo_code;
  var uuid = uuid;

  request.get({
    url : uberApiUrl + '/me',
    qs : {
      bearer_token : bearerToken,
      first_name : first_name,
      last_name : last_name,
      email : email,
      picture : picture,
      promo_code : promo_code,
      uuid : uuid
    }
  }, function(err, response, body) {
    if(err) {
      return res.json(err);
    }
    var results = JSON.parse(body);
    res.json(results);
  });
});

router.get('/venues', function(req, res){
  // var latitude = req.query.latitude;
  // var longitude = req.query.longitude;
  var latitude = 21.2969446;
  var longitude = -157.85642149999998;
  var location = latitude + ',' + longitude;
  var radius = 16093.4;
  var types = "bar";

  request.get({
    url : googleApiUrl + '/place/nearbysearch/json',
    qs : {
      key : googleServerToken,
      location : location,
      radius : radius,
      types : types
    }
  }, function(err, response, body) {
    if(err) {
      return res.json(err);
    }
    var results = JSON.parse(body);
    res.json(results);
  });
});

module.exports = router;