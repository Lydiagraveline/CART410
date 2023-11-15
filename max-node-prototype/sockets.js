const maxApi = require("max-api");
const mic = require('mic');
//import the Express library
let express = require('express');
const portNumber =4200;
let app = express(); //make an instance of express
let server = require('http').createServer(app);  // create a server (using the Express framework object)

//2:: call the require statement
const WebSocket = require("ws");
const wss = new WebSocket.Server({server});

// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)
// serve anything from this dir ...
app.use(express.static(__dirname + '/public'));
 
//default route
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

let microphone;
let isMicrophoneActive = false;

maxApi.addHandler('micToggle', () => {
  if (!microphone) {
    microphone = mic();
    microphone.start();
    isMicrophoneActive = true;
    console.log('Microphone turned on');
  } else {
    microphone.stop();
    microphone = null;
    isMicrophoneActive = false;
    console.log('Microphone turned off');
  }
});

// make server listen for incoming messages
server.listen(portNumber, function(){
  maxApi.post('listening on port:: '+portNumber);
})

//make a route to test page...(put ontop of the first app.use())
app.use('/clientCanvas', wsClientRequestRoute);
//and the function:
function wsClientRequestRoute(req, res, next) {
    res.sendFile(__dirname + '/public/client.html');
}

// Handle the process exit cleanly
process.on('exit', () => {
    if (microphone) {
      microphone.stop();
    }
  });

//wss listens for the connection event for incoming sockets, and if one is connected -:
//ws is  a single socket instance
//req is the request
wss.on('connection', function connection(ws,req) {

    
    ws.on('message', function incoming(message) {

        if (jsonParse.action === "toggleMic") {
            // Toggle the microphone on button click
            if (!microphone) {
              microphone = mic();
              microphone.start();
              isMicrophoneActive = true;
              console.log('Microphone turned on');
            } else {
              microphone.stop();
              microphone = null;
              isMicrophoneActive = false;
              console.log('Microphone turned off');
            }
          }

        //from public html
        let jsonParse = JSON.parse(message);

        //maxApi.post( jsonParse);
        if(jsonParse.label ==="note"){
            maxApi.outlet(jsonParse.value);
        } 

        if(jsonParse.label ==="sendMsg" ){
            maxApi.outlet(jsonParse.label);
            //maxApi.outlet(jsonParse.value);

            maxApi.post(jsonParse.value);
        } 
    
    })//message

})//connection




