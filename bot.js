var HTTPS = require('https');
var defBot = require('def_bot.js');


function respond() {
  var request = JSON.parse(this.req.chunks[0]);
    //Regular Expresions
    coolGuyRegex = /^\/cool guy$/;
    defBotRegex = /^\/define /;
    gifBotRegex = /^\/gif*/;

    if(request.text && gifBotRegex.test(request.text)) {
    }
    else if(request.text && defBotRegex.test(request.text)){
      console.log("\n\n" + request.text);
      console.log(request.sender_id);
      defBot.respond(request.text);
    }
    else if(request.text && coolGuyRegex.test(request.text)){

    this.res.writeHead(200);
    //postMessage(theURL);
    this.res.end();

    } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
