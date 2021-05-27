# Request-multiple-urls
[![GitHub issues](https://img.shields.io/github/issues/asrinivas61/request-multiple-urls)](https://github.com/asrinivas61/request-multiple-urls/issues)
[![GitHub forks](https://img.shields.io/github/forks/asrinivas61/request-multiple-urls)](https://github.com/asrinivas61/request-multiple-urls/network)
[![GitHub stars](https://img.shields.io/github/stars/asrinivas61/request-multiple-urls)](https://github.com/asrinivas61/request-multiple-urls/stargazers)
[![GitHub license](https://img.shields.io/github/license/asrinivas61/request-multiple-urls)](https://github.com/asrinivas61/request-multiple-urls/blob/main/LICENSE)

A nodeJS module used to fetch an array of URLs which contain JSON data and returns the response as a Promise Object.

## Installation steps
Run the below command in the terminal in the project you want to use
```console
npm install @srini/request-multiple-urls

```

## To run tests
If you are running this node-module in your local machine and want to run the tests.
```
npm test

```

## Example Usage

``` javascript
const requestMultipleUrls = require('@srini/request-multiple-urls');

const urls = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json', 
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json', 
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
]

const fetchResourceData = () => {
    const data = requestMultipleUrls(urls)
        .then(data => console.log(data))
        .catch(error => console.error(error))
}

fetchResourceData();

```

## Dependencies

### node-fetch

```node-fetch ``` makes use of minimal code for a window.fetch compatible API on Node.js runtime. It uses native Node streams for body, on both request and response. Also, it uses native promise, but allow substituting it with [insert your favorite promise library].

```abort-controller``` An AbortController object has an associated signal (an AbortSignal object).
An AbortSignal object has associated abort algorithms, which is a set of algorithms which are to be executed when its aborted flag is set. Unless specified otherwise, its value is the empty set.

```valid-url``` This module collects common URI validation routines to make input validation, and untainting easier and more readable. All functions return an untainted value if the test passes, and undef if it fails. This means that you should always check for a defined status explicitly. Don't assume the return will be true. The value to test is always the first (and often only) argument. There are a number of other URI validation modules out there as well (see below.) This one focuses on being fast, lightweight, and relatively 'real-world'. i.e. it's good if you want to check user input, and don't need to parse out the URI/URL into chunks. Right now the module focuses on HTTP URIs, since they're arguably the most common. If you have a specialized scheme you'd like to have supported, let me know.