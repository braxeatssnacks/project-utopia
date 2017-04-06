/* auth API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool;

  let User = require(`${__dirname}/../models/user.js`); // User

  // login
  router.post('/login', function(req, resp) {
    // log in user
    resp.render('login', { layout: 'intercom' });
  });

  // sign-up
  router.post('/signup', function(req, resp) {
    // create user
    resp.render('signup', { layout: 'intercom' });
  });

  // account recovery
  router.post('forgot', function(req, resp) {
    // send account recovery email
  });
};
