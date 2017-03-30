/* auth API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool;

  let User = require(`${__dirname}/../models/user.js`); // User

  // login
  router.post('/login', function(req, resp) {
    // log in user
  });

  // sign-up
  router.post('/signup', function(req, resp) {
    // create user
  });

  // account recovery
  router.post('forgot', function(req, resp) {
    // send account recovery email
  });
}
