/* game API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool; // db

  let Util = require(`${__dirname}/../utils/util.js`); // Utility
  let User = require(`${__dirname}/../models/user.js`); // User
  let Game = require(`${__dirname}/../models/game.js`); // Game
  let Stage = require(`${__dirname}/../models/stage.js`); // Stage

  var testID = 10; // TODO: set up session to hold user_id
  var id;

  router.route('/gamelist')
    .get(function(req, resp) { // render view of games list
      id = req.query.id || testID;

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
        if (err) console.log(err);
        console.log(`user ${newGame.user_id}'s game ${newGame.id} created`);
      });
    });


  /* GET PARAMS
   *  gameID = req.query.id
   *  stage = req.query.stage
   */
  router.route('/game')
    .get(function(req, resp) { // render game stage
      // create stage if doesn't exist
      Stage.create(req.query.stage, req.query.id, function(err, status) {
        if (err) console.log(err);
      });
      resp.render('game');
      console.log(`user ${testID}'s game ${game_id} is on stage ${stage_id}`); // TODO: change testID
    })
    .post(function(req, resp) { // db work
      if (req.body.action === 'submit') { // attempted code submission
        let stage_id = req.query.stage;
        let game_id = req.query.id;
        let code = req.body.data;

        // submit code
        Stage.submitCode(code, game_id, stage_id, function(err, status) {
          if (err) console.log(err);
          console.log(status ? 'successful submission' : 'failed submission');
        });
      } else if (req.body.action === 'complete') { // complete stage
        // TODO
      }

      resp.send();
    });
};
