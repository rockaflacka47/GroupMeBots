var http, director, cool, bot, router, server, port;


//DEPENDECIES
request     = require('request');
http        = require('http');
director    = require('director');
cool        = require('cool-ascii-faces');
coolGuy     = require('./cool_guy.js');
defBot      = require('./def_bot.js');
gifBot      = require('./gif_bot.js');

router = new director.http.Router({
  var request = JSON.parse(this.req.chunks[0]);
//Regular Expresions
  coolGuyRegex = /^\/cool guy$/;
  defBotRegex = /^\/define /;
  gifBotRegex = /^\/gif*/;

//RegEx Checks
  if(request.text){
    if(coolGuyRegex.test(request.text)){
      '/' : {
          post: coolGuy.respond,
          get: ping
      }
    }
    else if(defBotRegex.test(request.text)){
      '/' : {
        post: defBot.respond,
        get: ping
      }
    }
    else{
      '/' : {
        post: gifBot.respond,
        get: ping
      }
    }
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}
