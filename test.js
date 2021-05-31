const requestMultipleUrls = require('./index');

requestMultipleUrls([
  '',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json'
]).then(data => {
  console.log(JSON.stringify(data));
})
  .catch(err => {
    console.error('Request was not successful', err);
    process.exit(1);
  });
