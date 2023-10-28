window.onload = function () {
  console.log("client js loaded in ws example");
 /* Establishing a WebSocket relies on the HTTP Upgrade mechanism , so the request for the protocol upgrade is implicit 
   * when we address the web server as ws://www.example.com or wss://www.example.com.
   *  We are upgrading the HTTP conncection to a web socket connection
   * The WebSocket() constructor doees all the work to create the initial http connection 
   * and the handshaking protocol for you
   */
  let ws = new WebSocket("ws://localhost:4200");
//1: when the connection is open (setup)
  ws.onopen = function () {
    
    document.querySelectorAll(".button").forEach(function(el) {
      el.addEventListener("click",function(){
      
        ws.send(JSON.stringify({label:"note",value:el.id}))
      })

    })
     //2: when we receive something
     ws.onmessage = function (event) {
      let receivedMsg = JSON.parse(event.data);

      console.log("Message is received..." + receivedMsg);
      console.log(receivedMsg);    
 };

 }
 
  //2: when websocket closes
  ws.onclose = function () {
 
    // websocket is closed.
    console.log("Connection is closed...");
  };
 }