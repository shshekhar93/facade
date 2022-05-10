const { successResponse } = require("../lib/utils");
const { systemHandler } = require("./system");

const REQUEST_HANDLERS = {
  SYSTEM: systemHandler
};
function setupWebsocket(ws) {
  // Mandatory error event handler.
  ws.on('error', () => console.log('error on web-socket'));

  const messageHandler = (data) => {
    const { reqId, data: { handler } } = JSON.parse(data);
    const reqHandlerFn = REQUEST_HANDLERS[handler];
    reqHandlerFn(ws);
    ws.off('message', messageHandler);
    return ws.send(successResponse(reqId, 'ACCEPTED'));
  }

  ws.on('message', messageHandler);
}

module.exports = { 
  setupWebsocket
};
