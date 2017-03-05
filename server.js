var http = require('http')
var https=require("https");
var fs = require("fs")
var url = require('url')
var stop=true
running=0
var options = {
  "method": "PUT",
  "hostname": "na-hackathon-api.arrayent.io",
  "port": "443",
  "path": "/v3/devices/33554448?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkZTlkOTFmMC0wMTFjLTExZTctOTIwNy1iNWMzYjY2M2Y2YTQiLCJlbnZpcm9ubWVudF9pZCI6Ijk0OGUyY2YwLWZkNTItMTFlNi1hZTQ2LTVmYzI0MDQyYTg1MyIsInVzZXJfaWQiOiI5MDAwMDk5Iiwic2NvcGVzIjoie30iLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwiaWF0IjoxNDg4NjYxNjMyLCJleHAiOjE0ODk4NzEyMzJ9.dXStrvCXYayG3Frohle88cbpq2go25_OFvEpeCIQfbSpjjYKOoaBHRccJYNhtHzmnAWcygEsZgj1F9pHt0eqXQ",
  "headers": {
    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkZTlkOTFmMC0wMTFjLTExZTctOTIwNy1iNWMzYjY2M2Y2YTQiLCJlbnZpcm9ubWVudF9pZCI6Ijk0OGUyY2YwLWZkNTItMTFlNi1hZTQ2LTVmYzI0MDQyYTg1MyIsInVzZXJfaWQiOiI5MDAwMDk5Iiwic2NvcGVzIjoie30iLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwiaWF0IjoxNDg4NjYxNjMyLCJleHAiOjE0ODk4NzEyMzJ9.dXStrvCXYayG3Frohle88cbpq2go25_OFvEpeCIQfbSpjjYKOoaBHRccJYNhtHzmnAWcygEsZgj1F9pHt0eqXQ",
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "05e9d72e-2ab4-5643-8277-3c9aeec33040"
  }
};
var optionsNest = {
  "method": "PUT",
  "hostname": "developer-api.nest.com",
  "port": 443,
  "path": "/devices/thermostats/OZPa1A89KWDwkS38lL-VhUOlnXNrrr55/?auth=c.39cfZbq0NUfKRMS3WhkkQPgkPBApDtNcOYzP6LaneFGeSZIUegBnKZA53kmu80ctOOBCTTrIEKIRsp84NxgKMv0koaXE2GzpQmBFR0ksrWwTuqUH6mgyt63M8Dx0dxbZaWBtQW3eNfTzzIWZ",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "postman-token": "867018c9-d59c-bcfe-c70c-c93a10afc30d"
  }
};

var requestListener = function(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    console.log("received request")
    var queryObject = url.parse(req.url, true).query;
    queryValues = JSON.stringify(queryObject).replace(/\s+/g, '');
    console.log(queryValues)

    if(queryObject.led){
      if(queryObject.led=="1"){
        febrezeRunner(1)
      }

      if(queryObject.led=="2"){
        febrezeRunner(7)
      }
      if(queryObject.led=="3"){
        febrezeRunner(10)
      }
      if(queryObject.led=="4"){
        febrezeRunner(11)
      }
      if(queryObject.led=="5"){
        febrezeRunner(3)
      }
      if(queryObject.led=="6"){
        febrezeRunner(4)
      }
      if(queryObject.led=="7"){
        febrezeRunner(13)
      }
      if(queryObject.led=="8"){
        febrezeRunner(14)
      }

    }
    if(queryObject.onoff){
    if(queryObject.onoff=="on"){
      stop=true
      if(running==0){
        ledDesign()
      }



    }
    if(queryObject.onoff=="off"){
      stop=false
      febrezeRunner(9)
    }
  }

    res.writeHead(200);
    res.end('DESMOKIFY\n');



}

var server = http.createServer(requestListener);
server.listen(8081);

function febrezeRunner(ledIndex){
  var req1 = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req1.write(JSON.stringify([ { DeviceAction: 'led_mode=1' },
  { DeviceAction: 'led_color=0,'+ledIndex+',4,4,4' } ]));
req1.end();
}
function ledDesign(){
  running=1
  setInterval(
    function(){
      if(stop){
      febrezeRunner(9)
    }
  },2300
  )
  setInterval(
    function(){
      if(stop){
      febrezeRunner(5)
    }
  },3000
  )
  setInterval(
    function(){
      if(stop){
      febrezeRunner(3)
    }
  },1700
  )
  setInterval(
    function(){
      if(stop){
      febrezeRunner(4)
    }
  },1850
  )

}
