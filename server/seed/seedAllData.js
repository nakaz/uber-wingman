var mongoose  = require('mongoose'),
    dbname    = "uberwm_mongodb",
    CarsModel = require('../schema/cars');

var Car = mongoose.model("Car", CarsModel);

mongoose.connect("mongodb://localhost/" + dbname);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', deleteCars);

function deleteCars() {
  Car.remove({}, function (err) {
    if(err) console.log(err);
    insertCars();
  });
}

function insertCars() {
  Car.create(
    require('./locations.json'),
    function(err) {

      if(err) { return done(err); }
    });
}