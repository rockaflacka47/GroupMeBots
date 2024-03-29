var HTTPS = require('https');
var urban = require('urban');
var botID = process.env.DEF_BOT_ID;
var explitiveRegex = /.*rap(e|ist|ing).*/;//Use this regex to create a blacklist
function respond(request) {
      postMessage(request.replace("/define ", ""));
}

function postMessage(word) {
  try{
    var botResponse, options, body, botReq;
    botresponse = "error";
    trollface = urban(word);
    trollface.first(function(json) {
      if(typeof json == "undefined"){
        console.log(typeof json);
        sendDef("No definition found");
      }
      else{
      console.log(typeof json);
      console.log(json.definition);
      if(explitiveRegex.test(json.definition)){
        sendDef("That's vulgar, I'm not reading that to you.");
      }
      else{
        sendDef(json.definition);
      }
    }
    });
  }catch(ex){
    sendDef("No definition found");
  }
}

function sendDef(botResponse){
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };
  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
