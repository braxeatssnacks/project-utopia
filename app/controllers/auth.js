/* auth API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool;
  let session = modules.session;

  let User = require(`${__dirname}/../models/user.js`); // User

  // login
  router.route('/login')
    .get(function(req, resp) {
      // log in user
      resp.render('login');
    })
    .post(function(req, resp) { // login user
      session = req.session;
      session.email = req.body.email;
      resp.redirect('/gamelist');
    });

  // sign-up
  router.route('/signup')
    .get(function(req, resp) {
      // create user
      resp.render('signup');
    })
    .post(function(req, resp) { // create account & login user
      let newAccount = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      });

      newAccount.save(function(err, resp) {
        if (err) { // account already exists
          resp.redirect('/login');
        } else {
          console.log('new user created.');
          session = req.session;
          session.email = req.body.email;
          resp.redirect('/gamelist');
        }
      });
    });

  // logout
  router.route('/logout')
    .get(function(req, resp) {
      req.session.destroy(function(err) {
        if (err) { console.log(err); }
        else { resp.redirect('/'); }
      });
    });

  // TODO: account recovery
  router.post('forgot', function(req, resp) {
    // send account recovery email
  });
};
