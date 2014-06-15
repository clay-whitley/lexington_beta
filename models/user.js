var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password_digest: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;