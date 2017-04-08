// testing suite
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const request = require('supertest');
describe('loading express', function() {
  // global server
  let server;
  beforeEach(function() {
    server = require('../app.js')(config);
  });
  afterEach(function (done) {
      // server.close(done);
      server = null; // TODO
  });
  // home index
  it('responds to /', function testIndex(done) {
      request(server)
          .get('/')
          .expect(200, done);
  });
});
