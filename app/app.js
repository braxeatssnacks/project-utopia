// app server callback
module.exports = function(config) {

  // server configuration
  const fs = require('fs');
  const express = require('express');
  const app = express();  

  // set view engine/config
  const hbs = require('express-hbs');
  app.engine('hbs', hbs.express4({ 
    defaultLayout: `${__dirname}/views/layouts/main.hbs`, 
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
  }));

  app.set('view engine', 'hbs');
  app.set('views', `${__dirname}/views`);

  // setup global directories & middlewares
  const bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(`${__dirname}/public`));

  // modules for dependency injection
  const modules = {
    app: app, 
    bodyParser: bodyParser,
    config: config, 
    express: express,
    fs: fs
  };

  // setup global route controllers
  fs.readdirSync(`${__dirname}/controllers`).forEach(function(filename) {
    if (~filename.indexOf('.js')) { require(`${__dirname}/controllers/${filename}`)(modules); }
  });

  // start server
  app.listen(config.server.port, config.server.host);
}
