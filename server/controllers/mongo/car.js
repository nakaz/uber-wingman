var Cars = require('../../schema/cars');

var Car = {
  read: function(req, res, next) {
    res.json({ type: "Read", id: req.params.id });
  },
  create: function(req, res, next) {
    res.send(req.body);
  },
  update: function(req, res, next) {
    res.json({ type: "Update", id: req.params.id, body: req.body });
  },
  delete: function(req, res, next) {
    res.json({ type: "Delete", id: req.params.id });
  },
  getAll: function(req, res, next) {
    Cars.find(function (err, data) {
      if(err) console.log(err);
      res.json(data);
    });
  }
};

// Return the object
module.exports = Car;