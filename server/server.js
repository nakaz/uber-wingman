var express    = require('express'),
    app        = express(),
    router     = express.Router();

var api        = require('./api');
var redis      = require('redis'),
    session    = require('express-session'),
    RedisStore = require('connect-redis')(session);

var bodyParser = require('body-parser');

var config     = require('../config/config.json'),
    PORT       = config.port;

var mongoose   = require('mongoose'),
    dbUberWing = 'uberwm_mongodb',
    car        = require('./controllers/mongo/car');

var client     = redis.createClient(); // create redis client

var uberServerToken = process.env.UBER_SERVER_TOKEN;
var uberClientID = process.env.UBER_CLIENT_ID;
var uberClientSecret = process.env.UBER_CLIENT_SECRET;

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', api);

app.use(session({
  store: new RedisStore(),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000
  }
}));

//Login GET Request

router.get('/login', function(req, res){
  res.redirect('https://login.uber.com/oauth/v2/authorize?client_id=' + uberClientID + '&response_type=code&scope=request');
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