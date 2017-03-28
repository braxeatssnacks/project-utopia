module.exports = function(modules) {
  /* auth API */
  let router = modules.app;
  let pg = modules.pg; // db

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
