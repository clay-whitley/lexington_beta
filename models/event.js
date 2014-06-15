var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    type: {type: String, default: "exp"},
    timestamp: {type: Date, default: Date.now},
    skill_id: {type: String},
    current_exp: {type: Number},
    current_level: {type: Number},
    user_id: {type: String}
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
