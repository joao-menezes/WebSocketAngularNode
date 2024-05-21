const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let chatMessages = [];
let timer;

wss.on('connection', ws => {
    chatMessages.forEach(message => {
        ws.send(message);
    });

    ws.on('message', message => {
        const cleanedMessage = message.toString().replace(/^"(.*)"$/, '$1');

        chatMessages.push(cleanedMessage);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(cleanedMessage);
            }
        });
        console.log(chatMessages);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
