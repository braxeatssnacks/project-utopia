// app server callback
module.exports = function(config) {

  // server configuration
  const fs = require('fs');
  const express = require('express');
  const expressSession = require('express-session');
  const app = express();

  // set-up db jazz
  const pg = require('pg');
  const pool = require('./utils/database.js');

  // set view engine/config
  const hbs = require('express-hbs');
  app.engine('hbs', hbs.express4({
    defaultLayout: `${__dirname}/views/layouts/main.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
  }));

  app.set('view engine', 'hbs');
  app.set('views', `${__dirname}/views`);

  // register helpers
  const hbsHelpers = require('./utils/helpers.js')(hbs);

  // setup global directories & middlewares
  const bodyParser = require('body-parser');

  app.use(expressSession({
    secret: process.env.SESSION || config.session.secret,
    resave: false,
    saveUninitialized: false
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(`${__dirname}/public`));

  // modules for dependency injection
  let session;
  const modules = {
    app: app,
    bodyParser: bodyParser,
    config: config,
    express: express,
    fs: fs,
    pool: pool,
    session: session
  };

  // setup global route controllers
  fs.readdirSync(`${__dirname}/controllers`).forEach(function(filename) {
    if (~filename.indexOf('.js')) { require(`${__dirname}/controllers/${filename}`)(modules); }
  });

  // start server
  app.listen(config.server.port, config.server.host);
};
