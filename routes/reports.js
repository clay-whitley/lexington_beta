var models = require('../models');

exports.show = function(req, res){
  models.skillset.findById(req.query.skillsetId, function(err, data){
    if (err) return console.error(err);
    models.event.find({skill_id:{$in:data.skills}}, function(err2, data2){
      if (err2) return console.error(err2);
      res.json(data2);
    });
  });
};