// stage
const _ = require('lodash');
const schemas = require('./schemas.js');
const pool = require(`${__dirname}/../utils/database.js`);

let Util = require(`${__dirname}/../utils/util.js`); // utility

/* CONSTRUCTOR */

var Stage = function(data) {
  // create appropriate struct
  this.data = this.sanitize(data);
};

Stage.prototype.data = {};

/* IMPLEMENTATION INHERITED METHODS  */

// sanitize STAGE structure
Stage.prototype.sanitize = function(data) {
  let r_data = data || {};
  let s_schema = schemas.stage;
  return _.pick(_.defaults(r_data, s_schema), _.keys(s_schema));
};

/* STATIC METHODS */

// update datetime
Stage.update = function(game_id, stage_id, callback) {
  // query
  let q = Util.SQL`UPDATE stages SET date_updated=${new Date()}\
    WHERE game_id=${game_id} AND WHERE stage_id=${stage_id}`;
  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, true);
  });
};
// increment attempts
Stage.addAttempt = function(game_id, stage_id, callback) {
  // query
  let q = Util.SQL`UPDATE stages SET attempts=attempts+1\
      WHERE game_id=${game_id} AND WHERE stage_id=${stage_id}`;
  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, true);
  });
};

// submit code
Stage.submitCode = function(code, game_id, stage_id, callback) {
  // query
  let q = Util.SQL`UPDATE stages SET code=${code}\
    WHERE game_id=${game_id} AND WHERE stage_id=${stage_id}`;
  pool.query(q, function(err, data) {
    // increment attempts
    if (err) return callback(err);
    Stage.addAttempt(game_id, stage_id, function(err, respAttempt) {
      if (err) return callback(err);
      // date updated
      Stage.update(game_id, stage_id, function(err, respUpdate) {
        if (err) return callback(err);
        // TODO: check if code matches
        return callback(null, respAttempt && respUpdate);
      });
    });
  });
};


module.exports = Stage; // export class
