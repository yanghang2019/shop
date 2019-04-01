// var http = require("http");
// var server = http.createServer(function(req, res) {


//     console.log(req.body)
//     var alldata = '';
//     res.on('data', function(chunk) {
//         console.log(chunk, "chunk")
//         alldata += chunk;
//     });
//     let params = "";

//     res.on('end', function() {
//         console.log(111)
//         let data = alldata.toString();
//         //将接收到的字符串转换位为json对象
//         params = qs.parse(data);

//         res.writeHead(200, {
//             //"Content-Type": "application/x-www-form-urlencoded",
//             "Access-Control-Allow-Origin": "*",
//         });
//         console.log("接收到请求", params);

//         res.write("hello, I am cors");
//         res.end();
//     });
// });
// server.listen(3001, "localhost", function() {
//     console.log("开始监听cors...");
// });



var express = require("express");
var app = express();
var hostName = '127.0.0.1';
var port = 3001;

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("", function(req, res) {
    console.log("请求url：", req.path)
    console.log("请求参数：", req.query)
    res.send("这是get请求");
})

app.listen(port, hostName, function() {

    console.log(`服务器运行在http://${hostName}:${port}`);

});