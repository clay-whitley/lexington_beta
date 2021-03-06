var models = require('../models');

exports.index = function(req, res){
  models.skillset.find({user_id: req.session.current_user},function(err, data){
    if (err) return console.error(err);
    res.json(data);
  });
};

exports.create = function(req, res){
  var newSkillset = new models.skillset(req.body);
  newSkillset.user_id = req.session.current_user;
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
  models.skillset.findByIdAndUpdate(req.params.id, {name: req.body.name}, function(doc){
    res.json(doc);
  });
};

exports.delete = function(req, res){
  models.skillset.findByIdAndRemove(req.params.id, function(doc){
    res.json(doc);
  });
};