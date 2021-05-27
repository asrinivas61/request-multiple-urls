
exports.NotAnArrayError = function NotAnArrayError (message, urls) {
  const _this = Error.call(this, message);
  _this.urls = urls;

  return _this;
};

exports.InvalidURIFormat = function InvalidURIFormat (message, url) {
  const _this = Error.call(this, message);
  _this.url = url;

  return _this;
};

exports.APIResponseError = function APIResponseError (response) {
  const _this = Error.call(this, response.statusText);
  _this.url = response.url;
  _this.status = response.status;
  _this.statusText = response.statusText;

  return _this;
};
