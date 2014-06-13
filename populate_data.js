var mongoose = require('mongoose');
mongoose.connect(process.env.DOMAIN || 'mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to Mongo');
});

var models = require('./models');

var currentTime = new Date();
currentTime.setHours(currentTime.getHours()-48);


var running = new models.skill({name: "Running", exp: 5, percentage: 50}),
  pushups = new models.skill({name: "Pushups", exp: 10, percentage: 0}),
  hiking = new models.skill({name: "Hiking", exp: 7, percentage: 70}),
  newSkillset = new models.skillset({name: "Sample Skillset", skills: [running._id, pushups._id, hiking._id]});

var events = [
  new models.event({skill_id: running._id, current_exp: 0, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours())}),
  new models.event({skill_id: running._id, current_exp: 1, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+12)}),
  new models.event({skill_id: running._id, current_exp: 2, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+6)}),
  new models.event({skill_id: running._id, current_exp: 5, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+4)}),
  new models.event({skill_id: running._id, current_exp: 7, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+2)}),
  new models.event({skill_id: running._id, current_exp: 13, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+16)}),
  new models.event({skill_id: running._id, current_exp: 15, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+8)}),
  new models.event({skill_id: pushups._id, current_exp: 10, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()-48)}),
  new models.event({skill_id: pushups._id, current_exp: 8, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+12)}),
  new models.event({skill_id: pushups._id, current_exp: 11, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+6)}),
  new models.event({skill_id: pushups._id, current_exp: 12, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+4)}),
  new models.event({skill_id: pushups._id, current_exp: 14, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+2)}),
  new models.event({skill_id: pushups._id, current_exp: 25, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+16)}),
  new models.event({skill_id: pushups._id, current_exp: 30, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+8)}),
  new models.event({skill_id: hiking._id, current_exp: 5, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()-48)}),
  new models.event({skill_id: hiking._id, current_exp: 15, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+12)}),
  new models.event({skill_id: hiking._id, current_exp: 16, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+6)}),
  new models.event({skill_id: hiking._id, current_exp: 18, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+4)}),
  new models.event({skill_id: hiking._id, current_exp: 17, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+2)}),
  new models.event({skill_id: hiking._id, current_exp: 25, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+16)}),
  new models.event({skill_id: hiking._id, current_exp: 25, current_level: 0, timestamp: currentTime.setHours(currentTime.getHours()+8)})
];

running.save();
pushups.save();
hiking.save();
newSkillset.save();

for (var i=0;i<events.length;i++){
  events[i].save();
}
