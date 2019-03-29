var http = require("http");
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
    });
    // console.log(req, "Req")
    req.on('data', function(chunk) {
        console.log("nginx接受数据开始");
    });
    req.on('end', function() {
        console.log("nignx接受数据结束");
    });
    res.write("hi, ni hao");
    res.end();
});
server.listen(4000, "localhost", function() {
    console.log("开始监听nginx...");
});