var http = require("http");

//创建http服务器
http.createServer(function (req, res) {
	//写头部head信息和状态编码
	res.writeHead(200, { "Content-type": "text/blain" });
	res.write("Hello NodeJs");
	res.end();
}).listen(8082);
//listen表示编写接口



//2.阻塞代码实例
// const fs = require("fs");

// const data = fs.readFileSync("./views/text.txt");

// console.log(data.toString());
// console.log("程序执行结束");


//3.非阻塞代码


// const fs = require("fs");

// fs.read

// var events = require("events");
// var eventEmitter = new events.EventEmitter();

// const connectHandle = function connected() {
// 	console.log("链接成功");
// 	eventEmitter.emit("data_received");
// }

// eventEmitter.on("connection", connectHandle);

// eventEmitter.on("data_received", function () {
// 	console.log("数据接收成功")
// })

// eventEmitter.emit("connection");

// console.log("程序执行完毕")