var http = require("https");

var options = {
  "method": "PUT",
  "hostname": "developer-api.nest.com",
  "port": 443,
  "path": "/devices/thermostats/OZPa1A89KWDwkS38lL-VhUOlnXNrrr55/?auth=c.39cfZbq0NUfKRMS3WhkkQPgkPBApDtNcOYzP6LaneFGeSZIUegBnKZA53kmu80ctOOBCTTrIEKIRsp84NxgKMv0koaXE2GzpQmBFR0ksrWwTuqUH6mgyt63M8Dx0dxbZaWBtQW3eNfTzzIWZ",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "f9bb8f90-da60-fd5b-41bd-402ebe8b6021"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ fan_timer_active: false }));
req.end();
