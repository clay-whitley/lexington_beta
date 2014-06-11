var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    type: {type: String, default: "exp"},
    timstamp: {type: Date, default: Date.now},
    skill_id: {type: String}
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
