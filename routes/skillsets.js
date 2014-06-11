var models = require('../models');

exports.index = function(req, res){
  models.skillset.find(function(err, data){
    if (err) return console.error(err);
    res.json(data);
  });
};

exports.create = function(req, res){
  var newSkillset = new models.skillset(req.body);
  newSkillset.save(function(err, data){
    if (err) return console.error(err);
    res.json(data);
  });
};

exports.show = function(req, res){
  models.skillset.findById(req.params.id, function(err, data){
    if (err) return console.error(err);
    res.json(data);
  });
};

exports.update = function(req, res){

};

exports.delete = function(req, res){
  console.log(req.params.id);
  models.skillset.findByIdAndRemove(req.params.id, function(doc){
    res.json(doc);
  });
};