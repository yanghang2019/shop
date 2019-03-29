var http = require("http");
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
    });
    // console.log(req, "Req")
    res.write("show('me too') ");
    res.end();
});
server.listen(3002, "localhost", function() {
    console.log("开始监听...");
});