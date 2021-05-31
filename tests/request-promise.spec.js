const { expect } = require('chai');
const { requestPromise } = require('../lib/request-promise');
const ftseRes = require('./ftse-fsi.json');
const gbpRes = require('./gbp-hkd.json');

const mockUrls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json'
];

describe('lib/request-promise.js', () => {
  it('Module response should be equal to aggregated API response', async () => {
    const promiseArr = requestPromise(mockUrls);
    const response = await Promise.all(promiseArr);

    expect(response).to.deep.equal([ftseRes, gbpRes]);
  });

  it('Request promise module should return an eql array of Promise objects', () => {
    const promise = requestPromise(mockUrls);
    expect(promise).to.have.length(2);
  });

  it('Should handle error received from API, before returning the response', async () => {
    const invalidResourceUrl = 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.jsonp';
    const res = await Promise.all(requestPromise([invalidResourceUrl]));
    expect(res[0].status).to.equal(403);
    expect(res[0].url).equal(invalidResourceUrl);
    expect(res[0].statusText).to.equal('Forbidden');
  });

  it('Should handle the module input, if it is not an Array', async () => {
    const unexpectedInput = 'sample text for testing';
    try {
      await Promise.all(requestPromise(unexpectedInput));
    } catch (error) {
      expect(error.message).to.equal('Input URLs should be an Array');
    }
  });

  it('Should handle exceptions gracefully if the input URI is not in the standard format', async () => {
    const invalidURIinput = 'test-dummy-url';
    try {
      await Promise.all(requestPromise([invalidURIinput]));
    } catch (error) {
      expect(error.message).to.equal('Input URL is not in expected standard URI format');
    }
  });

  it('Should handle exceptions gracefully if the input URIs are empty', async () => {
    try {
      await Promise.all(requestPromise([]));
    } catch (error) {
      expect(error.message).to.equal('Input URLs array should not be empty');
    }
  });
});
