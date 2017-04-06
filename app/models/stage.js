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

User.prototype.data = {};

/* IMPLEMENTATION INHERITED METHODS  */

// sanitize STAGE structure
Stage.prototype.sanitize = function(data) {
  data = data || {};
  schema = schemas.stage;
  return _.pick(_.defaults(data, schema), _.keys(schema));
};



module.exports = Stage; // export class
