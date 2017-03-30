// game
const _ = require('lodash');
const schemas = require('./schemas.js');
const pool = require(`${__dirname}/../utils/database.js`);

let Util = require(`${__dirname}/../utils/util.js`); // utility

/* CONSTRUCTOR */

var Game = function(data) { // assume user_id
  // create appropriate struct
  this.data = this.sanitize(data);
};

Game.prototype.data = {};

/* IMPLEMENTATION INHERITED METHODS  */

// link to teacher classroom
Game.prototype.addClassroom = function(classroom_id) {
  var self = this;
  self.data.classroom_id = classroom_id;

  // query
  var q = Util.SQL`UPDATE games SET classroom_id=${self.data.classroom_id}\
    WHERE id=${self.data.id}`;
  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, true); // return success
  });
};

// log time accessed
Game.prototype.logDatetime = function() {
  var self = this;
  self.data.date_accessed = new Date();

  // query
  var q = Util.SQL`UPDATE games SET date_accessed=${self.data.date_accessed}\
    WHERE id=${self.data.id}`;
  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, self.data.date_accessed); // return datetime
  });
};

// retrieve object data property
Game.prototype.get = function(property) {
  return this.data[property];
};

// sanitize GAME structure
Game.prototype.sanitize = function(data) {
  data = data || {};
  schema = schemas.game;
  return _.pick(_.defaults(data, schema), _.keys(schema));
};

// INSERT game data into db
Game.prototype.save = function(callback) {
  var self = this;
  self.data = self.sanitize(self.data);

  if (self.data.id == null) { // new entry
    // query
    var q = Util.SQL`INSERT INTO games(\
      user_id,\
      classroom_id,\
      date_accessed\
    )\
    VALUES(\
      ${self.data.user_id},\
      ${self.data.classroom_id},\
      ${new Date()}\
    )`;

    pool.query(q, function(err, data) {
      if (err) return callback(err);
      return callback(null, true); // return success
    });
  }
  return callback("entry already exists: update instead of save"); // existing entry
};

/* STATIC METHODS */

// SELECT game info retrieve by id
Game.findByID = function(id, callback) {
  // query
  var q = Util.SQL`SELECT * FROM games WHERE id=${id}`;
  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, new Game(data.rows[0])); // return Game
  });
};

// SELECT games list info retrieve by id
Game.listByUserID = function(user_id, callback) {
  // query
  var q = Util.SQL`SELECT * FROM games WHERE user_id=${user_id}\
   ORDER BY date_accessed DESC`;
  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, new Game(data.rows)); // return List<Game>
  });
};

module.exports = Game; // export class
