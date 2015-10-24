var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
  name: String,
  category: String,
  primary_image: String
});

var CarsModel = mongoose.model("Car", carSchema);

module.exports = CarsModel;