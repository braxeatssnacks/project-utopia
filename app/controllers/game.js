module.exports = function(modules) {

  /* game API */
  let router = modules.app;
  let pool = modules.pool; // db
  var Util = require(`${__dirname}/../utils/util.js`); // utility


  // overall
  router.route('/game')
    .get(function(req, resp) { // render game
      var gameID = req.body;
      var data = {
        'name': 'Braxton Gunter'
      };
      resp.render('game', data);
    })
    .post(function(req, resp) { // update game
      // test db query
      var query = "INSERT INTO users(name, email, password) VALUES('Braxton Gunter', 'beg2119@columbia.edu', 'hello') RETURNING id;";
      pool.query(query, function(err, dbResp) {
        if (err) { console.error('query failed ', err); }
        resp.send(dbResp);
      });
    });
}
