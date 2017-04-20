/* auth API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool;
  let session = modules.session;

  let User = require(`${__dirname}/../models/user.js`); // User

  // login
  router.post('/login', function(req, resp) {
    // log in user
    resp.render('login', { layout: 'main' });
  });

  // sign-up
  router.post('/signup', function(req, resp) {
    // create user
    resp.render('signup', { layout: 'main' });
  });

  // TODO: account recovery
  router.post('forgot', function(req, resp) {
    // send account recovery email
  });
};
