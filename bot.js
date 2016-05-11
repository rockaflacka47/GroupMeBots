var HTTPS = require('https');
var defBot = require('./def_bot.js');
var gifBot = require('./gif_bot.js');
var coolGuy = require('./cool_guy.js');


function respond() {
  console.log("Request Recieved by bot.js");
  var request = JSON.parse(this.req.chunks[0]);
    //Regular Expresions
    coolGuyRegex = /^\/cool guy$/;
    defBotRegex = /^\/define /;
    gifBotRegex = /^\/gif*/;

    if(request.text && gifBotRegex.test(request.text)) {
      this.res.writeHead(200);
      this.res.end();
      console.log(request.text);
      console.log(request.sender_id);
      console.log("Sending request to gifBot");
      gifBot.respond(request.text);
    }
    else if(request.text && defBotRegex.test(request.text)){
      this.res.writeHead(200);
      this.res.end();
      console.log(request.text);
      console.log(request.sender_id);
      console.log("Sending request to defBot");
      defBot.respond(request.text);
    }
    else if(request.text && coolGuyRegex.test(request.text)){
      this.res.writeHead(200);
      this.res.end();
      console.log(request.text);
      console.log(request.sender_id);
      console.log("Sending request to coolGuy");
      coolGuy.respond(request.text);
    }
    else {
    console.log("don't care");
    }

}
exports.respond = respond;
