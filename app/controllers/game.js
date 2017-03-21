module.exports = function(modules) {
  /* game API */
  let router = modules.app;
  
  // overall
  router.route('/game')
    .get(function(req, resp) { // render game
      var gameID = req.param('id');
    })
    .post(function(req, resp) { // update game
    });

  // stage update
  router.post('/game/stage', function(req, resp) { 
    // attempt/stage complete?
  });
}
