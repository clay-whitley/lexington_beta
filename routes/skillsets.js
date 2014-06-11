var models = require('../models');

exports.index = function(req, res){
  // models.skillset.find(function(err, data){
  //   if (err) return console.error(err);
  //   res.json(data);
  // });
  res.json([{name: 'foo'}, {name: 'bar'}]);
};

exports.create = function(req, res){
  var newSkillset = new models.skillset({name: req.params.name});
  newSkillset.save();
};

exports.show = function(req, res){
  models.skillset.findOne({id: req.params.id}, function(err, data){
    if (err) return console.error(err);
    res.json(data);
  });
};

exports.update = function(req, res){

};

exports.delete = function(req, res){
  models.skillset.findOne({id: req.params.id}, function(err, data){
    if (err) return console.error(err);
    data.remove();
  });
};