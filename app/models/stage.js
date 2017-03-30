// stage
const _ = require('lodash');
const schemas = require('./schemas.js');
const pool = require(`${__dirname}/../utils/database.js`);

var Stage = function(data) {
  // replace
  this.data = this.sanitize(data);


  // sanitize STAGE structure
  this.sanitize = function(data) {
    data = data || {};
    schema = schemas.stage;
    return _.pick(_.defaults(data, schema), _.keys(schema));
  };
};

module.exports = Stage; // export class
