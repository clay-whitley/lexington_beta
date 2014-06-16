var mongoose = require('mongoose');

var skillSchema = mongoose.Schema({
    name: String,
    exp: {type: Number, default: 0},
    level: {type: Number, default: 0},
    percentage: {type: Number, default: 0},
    user_id: {type: String},
    exp_multi: {type: Number, default: 1},
    degr_multi: {type: Number, default: 0},
    skill_type: {type: String, default: "action"},
    time_spent: {type: Number}
});

var Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
