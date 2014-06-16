var models = require('../models');

exports.exp = function(req, res){
  var startTime, endTime, currentTime = new Date(), queryParams = {};

  if (req.query.range == "customRange"){
    startTime = new Date(parseInt(req.query.startTime));
    endTime = new Date(parseInt(req.query.endTime));
  } else if (req.query.range == "7Days"){
    endTime = new Date();
    startTime = new Date(currentTime.setHours(currentTime.getHours() - 168));
  } else if (req.query.range == "30Days"){
    endTime = new Date();
    startTime = new Date(currentTime.setHours(currentTime.getHours() - 720));
  }

  if (req.query.range != "allTime"){
    queryParams.timestamp = {$gte: startTime, $lte: endTime};
  }

  models.skillset.findById(req.query.skillsetId, function(err, data){
    if (err) return console.error(err);
    queryParams.skill_id = {$in:data.skills};
    console.log("Report query recieved:", queryParams);
    models.event.find(queryParams).sort('timestamp').exec(function(err2, data2){
      if (err2) return console.error(err2);
      res.json(data2);
    });
  });
};

exports.frequency = function(req, res){
  
}