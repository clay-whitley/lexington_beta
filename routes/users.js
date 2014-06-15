var models = require('../models'),
  bcrypt = require('bcrypt');

exports.create = function(req, res){
  var newUser = new models.user(req.body);

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) return console.error(err);
      delete req.body.password;
      req.body.password_digest = hash;

      var newUser = new models.user(req.body);
      newUser.save(function(err2, data){
        if (err2) return console.error(err2);
        req.session.current_user = data._id;
        res.json(data);
      });
    });
  });
};

exports.update = function(req, res){
  models.user.findByIdAndUpdate(req.params.id, req.body, function(err, data){
    res.json(data);
  });
};

