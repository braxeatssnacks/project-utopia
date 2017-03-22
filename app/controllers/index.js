module.exports = function(modules) {
  /* INDEX PAGE */
  let router = modules.app;

  // default
  router.get('/', function(req, resp) {
    resp.render('index');
  });
}
