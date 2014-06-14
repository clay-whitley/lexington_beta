var models = require('../models'),
  bcrypt = require('bcrypt');

exports.create = function(req, res){
  models.user.find({email: req.body.email}, function(err, data){
    if (err) return console.error(err);
    if (!data[0]) return res.json({loginSuccess: false, reason: 'email'});
    console.log(data);
    bcrypt.compare(req.body.password, data[0].password_digest, function(err2, isMatch) {
      if (err2) return console.error(err2);
      if (isMatch){
        console.log("Succesfully authenticated");
        req.session.current_user = data[0]._id;
        res.json({loginSuccess: true, current_user: data[0]._id});
      } else {
        console.log("Incorrect password");
        res.json({loginSuccess: false, reason: 'password'});
      }
    });
  });
};

exports.delete = function(req, res){
  delete req.session.current_user;
  res.json({logoutSuccess: true});
};
