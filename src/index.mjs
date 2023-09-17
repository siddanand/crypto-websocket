// import WebSocket from "ws";
import { w3cwebsocket as WebSocket } from "websocket";

let start = document.getElementById("start");
let input = document.getElementById("input");
let isActive = false; 
let ws;
  

function startSocket(){
if(!isActive){
     ws = new WebSocket(
      `wss://api.ndax.io/WSGateway/`
    );
  ws.onopen = () => {
    let message = {
      m: 0,
      i: 1,
      n: "SubscribeLevel1",
      o: JSON.stringify({ OMSId: 1, InstrumentId: input.value }),
    };
    message = JSON.stringify(message);
    ws.send(message);
  };
  
  ws.onmessage = (message) => {
    let data = JSON.parse(JSON.parse(message.data).o);
    console.log(data);
    document.getElementById("sup").innerHTML = data.BestBid;
  };
  ws.onerror = () => {};
  ws.onclose = () => {
    console.log(`WebSocket disconnected from ticker`);
  };
  isActive = true;
  // ws.close();
}
else{
  isActive = false;
ws.close();
}
}
function abc(){
  start.addEventListener(('click'), function(){
    startSocket()});
}

abc();
