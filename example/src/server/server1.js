const http = require("http");
const qs = require("querystring");

const server = http.createServer((request, response) => {
    response.sendDate = false;
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        "Content-Type": "text/plain",
    });
    var alldata = '';
    console.log("接收到请求");
    request.on('data', function(chunk) {
        alldata += chunk;
    });
    let params = "";

    request.on('end', function() {
        let data = alldata.toString();
        //将接收到的字符串转换位为json对象
        params = qs.parse(data);
    });
    const proxyRequest = http
        .request({
                host: '127.0.0.1',
                port: 4000,
                url: '/',
                method: request.method,
                headers: request.headers,
                data: params
            },


            serverResponse => {
                // 第三步：收到服务器的响应
                var body = ''
                serverResponse.on('data', chunk => {
                    body += chunk
                })
                serverResponse.on('end', () => {
                    // 第四步：将响应结果转发给浏览器
                    response.end(body)
                })
            }
        )
        .end()
});

server.listen(3000, () => {
    console.log('The proxyServer is running at http://localhost:3000')
})