// https://www.youtube.com/watch?v=FduLSXEHLng  강좌 참조
// 서버와 클라이언트간의 websocket connection은 HTTP를 통해 이루어진다.
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const server = http.createServer(function (req, res) {
    fs.readFile('../index.html', 'utf-8', function (err, data) {
        res.end(data);
        res.writeHead(200);
    })
});
const wss = new WebSocket.Server({ server });


wss.on('connection', ws => {
    console.log("New client connected!");

    ws.on('message', data => {
        console.log(`Client has sent us: ${data}`);

        ws.send(data.toString().toUpperCase());
    });

    ws.on('close', () => {
        console.log('Client has disconnected!');
    });
})
server.listen(8082);