/* game API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool; // db

  let Util = require(`${__dirname}/../utils/util.js`); // Utility
  let User = require(`${__dirname}/../models/user.js`); // User
  let Game = require(`${__dirname}/../models/game.js`); // Game
  let Stage = require(`${__dirname}/../models/stage.js`); // Stage

  var testID = 10; // TODO: set up session to hold user_id

  router.route('/gamelist')
    .get(function(req, resp) { // render view of games list
      let id = req.query.id || testID;

      Game.listByUserID(id, function(err, games) { // get games list
        if (err) console.log('error: ', err);
        resp.render('gamelist', { games: games });
      });
    })
    .post(function(req, resp) { // create game
      let gameConfig = {
        user_id: parseInt(req.body.user_id || testID),
        classroom_id: parseInt(req.body.classroom_id || null)
      };
      let newGame = new Game(gameConfig);
      console.log('newgame: ', newGame);
      newGame.save(function(err, data) {
        console.log(`user ${newGame.user_id}'s game ${newGame.id} created`);
      });
    });

  router.route('/game')
    .get(function(req, resp) { // render
      console.log(req.query);
      // start game
      resp.render('game');
    })
    .post(function(req, resp) { // db work
      // attempted code submission
      console.log(req.query);
      resp.end();
    });
};
