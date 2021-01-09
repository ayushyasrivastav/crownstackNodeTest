/**
 * Global function for Api Responses in Success and Failure
 * @param {*} res
 * @param {*} httpCode
 * @param {*} status
 * @param {*} msg
 * @param {*} data
 */
export function apiResponse(res, httpCode, status, msg, data) {
    res.status(httpCode);
    var resObj = {};
    if (status === 0) {
      resObj = {
        status: status,
        message: msg,
        error: data,
      };
    } else if (status === 1) {
      resObj = {
        status: status,
        message: msg,
        result: data,
      };
    }
    return res.json(resObj);
  }
