var models = require('../models');

var expTable = {
  0:0,
  1: 10,
  2: 25,
  3: 45,
  4: 70,
  5: 100
};

exports.index = function(req, res){
  models.skillset.findById(req.query.skillsetId, function(err,data){
    if (err) return console.error(err);
    models.skill.find({_id:{$in:data.skills}}, function(err2, skills){
      res.json(skills);
    });
  });
};

exports.create = function(req, res){
  var newSkill = new models.skill({name: req.body.name});
  newSkill.save(function(err, skill){
    if (err) return console.error(err);
    models.skillset.findById(req.body.skillset_id, function(err2, data){
      if (err2) return console.error(err2);
      data.skills.push(skill._id);
      data.save(function(){
        res.json(skill);
      });
    });
  });
};

exports.show = function(req, res){

};

exports.update = function(req, res){
  var eventType = "exp";

  if (req.body.exp >= expTable[req.body.level + 1]){
    req.body.level++;
    eventType = "level";
  }

  req.body.percentage = Math.floor(((req.body.exp - expTable[req.body.level]) / (expTable[req.body.level + 1] - expTable[req.body.level])) * 100);

  if (req.body.updateType == "exp"){
    var newEvent = new models.event({skill_id: req.body._id, current_exp: req.body.exp, current_level: req.body.level, type: eventType});
    newEvent.save();
    delete req.body.updateType;
  }

  delete req.body._id;

  models.skill.findByIdAndUpdate(req.params.id, req.body, function(err, data){
    if (err) return console.error(err);
    res.json(data);
  });
};

exports.delete = function(req, res){

};