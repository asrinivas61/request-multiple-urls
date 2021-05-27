const { requestPromise } = require('./lib/request-promise');

const requestMultipleUrls = (urlArr) => {
  const response = Promise.all(requestPromise(urlArr));
  return response;
};

module.exports = requestMultipleUrls;
