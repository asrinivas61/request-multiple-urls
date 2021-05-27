const fetch = require('node-fetch');
const validUrl = require('valid-url');
const AbortController = require('abort-controller');
const {
  NotAnArrayError,
  APIResponseError,
  InvalidURIFormat
} = require('./errors');
const { REQUEST_TIMEOUT } = require('./constants');

/**
 * AbortController Constructor initialization
 */
const controller = new AbortController();

/**
 * Timeout handler to get the request terminated
 * upon reaching to the set threshold
 */
const timeout = setTimeout(
  () => {
    controller.abort();
    console.log('No response received in given threshold timeout and request got terminated');
  },
  REQUEST_TIMEOUT
);

/**
 * Status check of the Response and return a Promise
 * state according to input
 *
 * @param {res} API response received
 * @return {Promise} Promise to handle at ladder
 */
const checkResStatus = (res) => {
  if (res.ok) { return Promise.resolve(res); } else { return Promise.reject(new APIResponseError(res)); }
};

/**
 * Deconstruct the response by parsing it and build/format
 * the required module response
 *
 * @param {res} API response received
 * @return {Object} Formatted object for a given URL response
 */
const parseResponse = async (res) => {
  clearTimeout(timeout);
  const { url, status } = res;
  return {
    url,
    status,
    body: await res.json()
  };
};

/**
 * Resolve the given Array of URLs and parse
 * and validate the content before sending it
 * to upstream consumer.
 *
 * @param {Array} input urls
 * @return {Promise} Array of promises to resolve at root
 */
const requestPromise = (urls) => {
  if (!Array.isArray(urls)) {
    return new Array(Promise.reject(new NotAnArrayError('Input URLs should be an Array', urls)));
  }

  return urls.map(url => {
    if (!validUrl.isUri(url)) {
      return new Array(Promise.reject(new InvalidURIFormat('Input URL is not in expected standard URI format', url)));
    }

    return fetch(url, { signal: controller.signal })
      .then(checkResStatus)
      .then(parseResponse)
      .catch(err => {
        clearTimeout(timeout);
        console.log(`Something went wrong: ${JSON.stringify(err)}`);
        return err;
      });
  });
};

module.exports = { requestPromise };
