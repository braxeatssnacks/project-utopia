// game
const _ = require('lodash');
const schemas = require('./schemas.js');
const pool = require(`${__dirname}/../utils/database.js`);

let Util = require(`${__dirname}/../utils/util.js`); // utility

/* CONSTRUCTOR */

var Game = function(data) { // let's assume user_id will be passed in
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

// sanitize GAME structure
Game.prototype.sanitize = function(data) {
  data = data || {};
  schema = schemas.game;
  return _.pick(_.defaults(data, schema), _.keys(schema));
};

/* STATIC METHODS */

// SELECT game info retrieve by id
Game.findByID = function(id, callback) {
  // query
  var q = Util.SQL`SELECT * FROM game WHERE id=${id}`;
  pool.query(q, function(err, data) { 
    if (err) return callback(err);
    return callback(null, new Game(data.rows[0])); // return Game
  });
};

// SELECT games list info retrieve by id
Game.findByuserID = function(user_id, callback) {
  // query
  var q = Util.SQL`SELECT * FROM game WHERE user_id=${user_id}\
   ORDER BY date_accessed DESC`;
  pool.query(q, function(err, data) { 
    if (err) return callback(err);
    return callback(null, new Game(data.rows)); // return List<Game>
  });
};

module.exports = Game; // export class
