// stage

const pg = require('pg');
const _ = require('lodash');
const schemas = require('./schemas.js');

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
