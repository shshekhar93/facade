const { WebSocketServer } = require('ws');
const { setupWebsocket } = require('./handlers');

const server = new WebSocketServer({ port: 8000 });
server.on('connection', setupWebsocket);
server.on('listening', () => console.log('server started..'));
