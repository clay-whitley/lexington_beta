var models = require('../models');

exports.show = function(req, res){
  models.event.find(function(err, data){
    if (err) return console.error(err);
    res.json(data);
  });
};