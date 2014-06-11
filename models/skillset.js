var mongoose = require('mongoose');

var skillsetSchema = mongoose.Schema({
    name: String
});

var Skillset = mongoose.model('Skillset', skillsetSchema);

module.exports = Skillset;