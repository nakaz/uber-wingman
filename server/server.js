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

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.urlencoded({extended: false}));

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

app.use(function (req, res, next) {
  var session = req.session;

  if (session.views) {
    session.views++;
  } else {
    session.views = 1;
  }

  console.log('viewed ', session.views, ' times!');
  next();
});

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