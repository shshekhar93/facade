function errorResponse(reqId, error) {
  return JSON.stringify({
    success: false,
    reqId,
    data: {
      error,
    },
  });
}

function successResponse(reqId, data) {
  return JSON.stringify({
    success: true,
    reqId,
    data,
  });
}

module.exports = {
  errorResponse,
  successResponse,
};
