/* game API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool; // db
  let session = modules.session;

  let Util = require(`${__dirname}/../utils/util.js`); // Utility
  let User = require(`${__dirname}/../models/user.js`); // User
  let Game = require(`${__dirname}/../models/game.js`); // Game
  let Stage = require(`${__dirname}/../models/stage.js`); // Stage

  let id; // session ID

  router.route('/gamelist')
    .get(function(req, resp) { // render view of games list
      session = req.session;
      if (session.email) { // user logged in
        User.findByEmail(session.email, function(err, userObj) {
          id = userObj.id;
          Game.listByUserID(id, function(err, games) { // get games list
            if (err) console.log('error: ', err);
            resp.render('gamelist', { games: games });
          });
        });
      } else { resp.redirect('/login'); }
    })
    .post(function(req, resp) {
      if (req.body.action === 'create') { // create game
        let gameConfig = {
          user_id: parseInt(id),
          classroom_id: parseInt(req.body.classroom_id) || null
        };
        let newGame = new Game(gameConfig);
        newGame.save(function(err, insertedID) {
          if (err) console.log(err);
          resp.end(insertedID.toString()); // send game id
        });
      }
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
      resp.render('game', { stage: req.query.stage });
      console.log(`gamer ${id}'s game with id ${req.query.id} is on stage ${req.query.stage}`);
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
