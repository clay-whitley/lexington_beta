var models = require('../models');

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

};

exports.delete = function(req, res){

};