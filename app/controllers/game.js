/* game API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool; // db

  let Util = require(`${__dirname}/../utils/util.js`); // Utility
  let User = require(`${__dirname}/../models/user.js`); // User
  let Game = require(`${__dirname}/../models/game.js`); // Game

  var testID = 10;

  // list view of all existing games
  router.route('/gamelist')
    .get(function(req, resp) {
      var id = req.query.id || testID;
      var params = {}; // object passed to view

      // User.findByID(id, function(err, data) { // get user info
      //   if (err) console.log("error: ", err);
      //   params['user'] = data;
      //
      //   Game.listByUserID(id, function(err, data) { // get games list
      //     if (err) console.log('error: ', err);
      //     console.log(data);
      //   });
      // });

      resp.render('gamelist', params);
    })
    .post(function(req, resp) {

      var gameConfig = {
        user_id: parseInt(req.body.user_id || testID),
        classroom_id: parseInt(req.body.classroom_id || null)
      };

      var newGame = new Game(gameConfig);
      console.log('newgame: ', newGame);
      newGame.save(function(err, data) {
        console.log(`user ${user_id}'s game ${newGame.id} created`);
      });
    });

  // overall
  router.route('/game')
    .get(function(req, resp) { // render game
      resp.render('game');
    })
    .post(function(req, resp) { // update game
    });
}
