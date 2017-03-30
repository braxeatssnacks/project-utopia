/* game API */
module.exports = function(modules) {
  let router = modules.app;
  let pool = modules.pool; // db

  let Util = require(`${__dirname}/../utils/util.js`); // Utility

  // overall
  router.route('/game')
    .get(function(req, resp) { // render game
      resp.render('game');
    })
    .post(function(req, resp) { // update game
    });
}
