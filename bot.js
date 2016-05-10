var HTTPS = require('https');
var request = require('request');

//Regular Expresions
  coolGuyRegex = /^\/cool guy$/;
  defBotRegex = /^\/define /;
  gifBotRegex = /^\/gif*/;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
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
      var theURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=5";
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
