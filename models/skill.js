var mongoose = require('mongoose');

var skillSchema = mongoose.Schema({
    name: String,
    exp: {type: Number, default: 0},
    level: {type: Number, default: 0},
    percentage: {type: Number, default: 0},
    user_id: {type: String}
});

var Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
