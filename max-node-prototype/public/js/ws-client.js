window.onload = function () {


  

  var url = window.location.href;


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

    var spacebar_pressed = false;
window.onkeydown = function(event) {
    if (event.keyCode == 32) {
      //event.preventDefault();
        spacebar_pressed = true;
        //console.log("pressed");
        let btn = document.getElementById("btnB");
        btn.click();
        btn.classList.add('active');
       // document.querySelector('#btnB').click();
        //ws.send(JSON.stringify({ label: "note", value: this.id }));
        ws.send(JSON.stringify({  action: 'toggleMic' }));
    };
};
window.onkeyup = function() {
    if (event.keyCode == 32) {
        spacebar_pressed = false;
        //console.log("not pressed");
        let btn = document.getElementById("btnB");
        btn.classList.remove('active');
        ws.send(JSON.stringify({ label: "note", value: "stop_listening" }));
    };
}
  

  // the b button
  document.querySelector("#btnA").addEventListener("click", function () {
    ws.send(JSON.stringify({ label: "note", value: this.id }));
  });

  document.getElementById('toggleMicBtn').addEventListener('click', () => {
    console.log("toggle mic");
    ws.send(JSON.stringify({ action: 'toggleMic' }));
  });

    // the first button
    document.querySelector("#btnB").addEventListener("click", function () {
     // console.log("button b click");
      //ws.send(JSON.stringify({ label: "note", value: this.id }));
    });

    // the text input
    document.querySelector("#sendMsg").addEventListener("click", function() {
      
      let msg = document.querySelector("#inputRegex").value;
      if (msg == "") {
        console.log("Error: please type something");
      } else {
        console.log("message sent");
        let jsonMessage = JSON.stringify({label:"message",value:msg});
       // ws.send(jsonMessage);
        ws.send(JSON.stringify({ label: "sendMsg", value: msg }));
        document.querySelector("#inputRegex").value = " "; //clear the input
      }
    });

     //2: when we receive something
     ws.onmessage = function (event) {
     
      try {
        console.log("received");
        let receivedMsg = JSON.parse(event.data);
       // const receivedMsg = JSON.parse(message);
        console.log("Message is received..." + receivedMsg);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
 };

 }



//  document.querySelector("#findData").forEach(function(el) {
//   el.addEventListener("click",function(){

//   })
//  })

 
  //2: when websocket closes
  ws.onclose = function () {
 
    // websocket is closed.
    console.log("Connection is closed...");
  };
 }

