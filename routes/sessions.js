var models = require('../models'),
  bcrypt = require('bcrypt');

exports.create = function(req, res){
  models.user.find({email: req.body.email}, function(err, data){
    if (err) return console.error(err);
    bcrypt.compare(req.body.password, data.password_digest, function(err2, res) {
      if (err2) return console.error(err2);
      if (res){
        console.log("Succesfully authenticated");
        res.json({});
      } else {
        console.log("Incorrect password");
        res.json({});
      }
    });
  });
};

exports.delete = function(req, rest){

};
