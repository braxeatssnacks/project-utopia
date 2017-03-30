module.exports = function(modules) {

  /* game API */
  let router = modules.app;
  let pool = modules.pool; // db

  let Util = require(`${__dirname}/../utils/util.js`); // utility
  let User = require(`${__dirname}/../models/user.js`); // User class 

  // overall
  router.route('/game')
    .get(function(req, resp) { // render game
      var gameID = req.body;
      var userData = {
        'name': 'Test1',
        'email': 'yoyoyoyo@mail.google.com',
        'pass': 'secret'
      };

//      var newUser = new User(userData);
//      newUser.save(function(err, user) {
//        console.log("error ", err);
//        console.log("saved: ", user);
//      });

      resp.render('game');
    })
    .post(function(req, resp) { // update game
      // test db query
      User.findByID(1, function(err, user) {
        console.log(user); 
      });
      resp.send("yo");
    });
}
