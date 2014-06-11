var mongoose = require('mongoose');

var skillSchema = mongoose.Schema({
    name: String
});

var Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
