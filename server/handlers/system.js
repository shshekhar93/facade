const WebSocket = require("ws");
const { getDateTime } = require("../lib/system");
const { errorResponse, successResponse } = require("../lib/utils");

const SYSTEM_CALLS = {
  GET_DATE_TIME: getDateTime
}

/**
 * 
 * @param {WebSocket} ws 
 */
function systemHandler(ws) {
  ws.on('message', (data) => {
    const { reqId, data: { call = '', params = [] } = {} } = JSON.parse(data);
    const sysCallFn = SYSTEM_CALLS[call];
    if(!sysCallFn) {
      console.error('Invalid sys call:', call);
      return ws.send(errorResponse(reqId, 'INVALID_SYS_CALL'));
    }

    const result = sysCallFn.apply(null, params);
    return ws.send(successResponse(reqId, result));
  });
}

module.exports = {
  systemHandler
};
