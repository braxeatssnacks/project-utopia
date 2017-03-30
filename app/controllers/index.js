/* INDEX PAGE */
module.exports = function(modules) {
  let router = modules.app;

  // default
  router.get('/', function(req, resp) {
    resp.render('index');
  });
}
