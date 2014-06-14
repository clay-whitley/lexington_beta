var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODOMAIN || 'mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to Mongo');
});

var models = require('./models');

var currentTime = new Date();

var running = new models.skill({name: "Running", exp: 18, level: 1, percentage: 53}),
  pushups = new models.skill({name: "Pushups", exp: 31, level: 2, percentage: 30}),
  hiking = new models.skill({name: "Hiking", exp: 28, level: 2, percentage: 15}),
  physicalSkillset = new models.skillset({name: "Physical Skillset", skills: [running._id, pushups._id, hiking._id]});

var meditation = new models.skill({name: "Meditation", exp: 29, level: 2, percentage: 20}),
  coding = new models.skill({name: "Coding", exp: 46, level: 3, percentage: 4}),
  breathing = new models.skill({name: "Cleansing Breath", exp: 23, level: 1, percentage: 86}),
  mentalSkillset = new models.skillset({name: "Mental Skillset", skills: [meditation._id, coding._id, breathing._id]});

var physicalEvents = [
  new models.event({skill_id: running._id, current_exp: 0, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(1)}),
  new models.event({skill_id: running._id, current_exp: 1, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(3)}),
  new models.event({skill_id: running._id, current_exp: 2, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(4)}),
  new models.event({skill_id: running._id, current_exp: 5, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(10)}),
  new models.event({skill_id: running._id, current_exp: 7, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(20)}),
  new models.event({skill_id: running._id, current_exp: 13, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(3)}),
  new models.event({skill_id: running._id, current_exp: 15, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(10)}),
  new models.event({skill_id: running._id, current_exp: 18, current_level: 0, timestamp: new Date()}),
  new models.event({skill_id: pushups._id, current_exp: 10, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(1)}),
  new models.event({skill_id: pushups._id, current_exp: 8, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(10)}),
  new models.event({skill_id: pushups._id, current_exp: 11, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(12)}),
  new models.event({skill_id: pushups._id, current_exp: 12, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(18)}),
  new models.event({skill_id: pushups._id, current_exp: 14, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(22)}),
  new models.event({skill_id: pushups._id, current_exp: 25, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(29)}),
  new models.event({skill_id: pushups._id, current_exp: 30, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(6)}),
  new models.event({skill_id: pushups._id, current_exp: 31, current_level: 0, timestamp: new Date()}),
  new models.event({skill_id: hiking._id, current_exp: 5, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(1)}),
  new models.event({skill_id: hiking._id, current_exp: 15, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(10)}),
  new models.event({skill_id: hiking._id, current_exp: 16, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(13)}),
  new models.event({skill_id: hiking._id, current_exp: 18, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(20)}),
  new models.event({skill_id: hiking._id, current_exp: 17, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(29)}),
  new models.event({skill_id: hiking._id, current_exp: 25, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(6)}),
  new models.event({skill_id: hiking._id, current_exp: 25, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(11)}),
  new models.event({skill_id: hiking._id, current_exp: 28, current_level: 0, timestamp: new Date()})
];

var mentalEvents = [
  new models.event({skill_id: meditation._id, current_exp: 10, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(1)}),
  new models.event({skill_id: meditation._id, current_exp: 13, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(3)}),
  new models.event({skill_id: meditation._id, current_exp: 20, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(4)}),
  new models.event({skill_id: meditation._id, current_exp: 21, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(10)}),
  new models.event({skill_id: meditation._id, current_exp: 18, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(20)}),
  new models.event({skill_id: meditation._id, current_exp: 25, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(3)}),
  new models.event({skill_id: meditation._id, current_exp: 30, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(10)}),
  new models.event({skill_id: meditation._id, current_exp: 29, current_level: 0, timestamp: new Date()}),
  new models.event({skill_id: coding._id, current_exp: 10, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(1)}),
  new models.event({skill_id: coding._id, current_exp: 8, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(10)}),
  new models.event({skill_id: coding._id, current_exp: 16, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(12)}),
  new models.event({skill_id: coding._id, current_exp: 19, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(18)}),
  new models.event({skill_id: coding._id, current_exp: 25, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(22)}),
  new models.event({skill_id: coding._id, current_exp: 27, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(29)}),
  new models.event({skill_id: coding._id, current_exp: 30, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(6)}),
  new models.event({skill_id: coding._id, current_exp: 46, current_level: 0, timestamp: new Date()}),
  new models.event({skill_id: breathing._id, current_exp: 5, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(1)}),
  new models.event({skill_id: breathing._id, current_exp: 10, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(10)}),
  new models.event({skill_id: breathing._id, current_exp: 16, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(13)}),
  new models.event({skill_id: breathing._id, current_exp: 18, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(20)}),
  new models.event({skill_id: breathing._id, current_exp: 15, current_level: 0, timestamp: new Date(currentTime.setMonth(4)).setDate(29)}),
  new models.event({skill_id: breathing._id, current_exp: 20, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(6)}),
  new models.event({skill_id: breathing._id, current_exp: 25, current_level: 0, timestamp: new Date(currentTime.setMonth(5)).setDate(11)}),
  new models.event({skill_id: breathing._id, current_exp: 23, current_level: 0, timestamp: new Date()})
];

running.save();
pushups.save();
hiking.save();
physicalSkillset.save();

for (var i=0;i<physicalEvents.length;i++){
  physicalEvents[i].save();
}

meditation.save();
coding.save();
breathing.save();
mentalSkillset.save();

for (var i=0;i<mentalEvents.length;i++){
  mentalEvents[i].save();
}
