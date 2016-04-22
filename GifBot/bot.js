var HTTPS = require('https');
//var gif = require('./gif');
var request = require('request');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/gif*/;

  if(request.text && botRegex.test(request.text)) {
    var search = request.text.replace("/gif ", "");
    search = request.text.replace("/gif", "");
    search = search.replace(" ","");
    var sanityCheck = /^[a-zA-Z0-9 ]+$/;
    console.log(!(sanityCheck.test(search)));
    if(!(sanityCheck.test(search))) {
      postMessage("NO, you're trying to hack me :(");
    } else {
      var theURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=1";
      var temp;
      getGif(theURL, function(result){
        console.log("echo " + result);
        postMessage(result);
      });
    }

    this.res.writeHead(200);
    //postMessage(theURL);
    this.res.end();

  } else {
    //console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function getGif(url, callback) {
  request({
    url: url,
    json: true
  }, function(er, respn, bdy) {
    if(!er) {
      var temp = bdy;
      try {
        callback(temp.data[0].images.original.url);
      } catch (ex) {
        console.log("No such element");
      }

    }
  });
}

function postMessage(resp) {
  var botResponse, options, body, botReq;

  botResponse = resp;

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
