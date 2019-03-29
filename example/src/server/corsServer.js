var http = require("http");
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
    });
    res.write("hello, I am cors");
    res.end();
});
server.listen(3001, "localhost", function() {
    console.log("开始监听cors...");
});