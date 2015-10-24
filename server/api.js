var router  = require('express').Router(),
    request = require('request');

var uberApiUrl       = 'https://sandbox-api.uber.com/v1',
    uberClientId     = process.env.UBER_CLIENT_ID,
    uberClientSecret = process.env.UBER_CLIENT_SECRET,
    uberServerToken  = process.env.UBER_SERVER_TOKEN;

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

// router.get('/estimates/price', function (req, res) {
//   var source = JSON.parse(req.query.source);
//   var destination = JSON.parse(req.query.destination);

//   // create an http request to uber api
//   request.get({
//     url : uberApiUrl + '/estimates/price',
//     qs : {
//       server_token : uberServerToken,
//       start_latitude : source.lat,
//       start_longitude : source.lng,
//       end_latitude : destination.lat,
//       end_longitude : destination.lng
//     }
//   }, function(err, response, body) {
//     if(err) {
//       return res.json(err);
//     }
//     res.json(body);
//   });
// });

module.exports = router;