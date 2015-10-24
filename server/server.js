var express    = require('express'),
    app        = express(),
    router     = express.Router();

var api        = require('./api');

var bodyParser = require('body-parser');

var config     = require('../config/config.json'),
    PORT       = config.port;

var mongoose   = require('mongoose'),
    dbUberWing = 'uberwm_mongodb',
    car        = require('./controllers/mongo/car');

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);

router.get('/', function(req, res){
  res.send("hello world");
});

// Get all cars
router.get('/api/products/cars', car.getAll);

// Get one car, update one car, delete one car
router.route('/api/products/car/:id')
  .get(car.read)
  .put(car.update)
  .delete(car.delete);

// Register the routing
app.use('/', router);

mongoose.connect("mongodb://localhost/" + dbUberWing);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);

function startServer(){
  var server = app.listen(PORT, function(){
    var HOST = server.address().address;

    console.log('Server listening at http://%s%s', HOST, PORT);
  });
}