var mongoose = require('mongoose');

var skillsetSchema = mongoose.Schema({
    name: String,
    skills: {type: Array, default: []}
});

var Skillset = mongoose.model('Skillset', skillsetSchema);

module.exports = Skillset;