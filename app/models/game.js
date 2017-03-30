// game

const pg = require('pg');
const _ = require('lodash');
const schemas = require('./schemas.js');

var Game = function(data) {
  // replace 
  this.data = this.sanitize(data); 


  // sanitize USER structure
  this.sanitize = function(data) {
    data = data || {};
    schema = schemas.game;
    return _.pick(_.defaults(data, schema), _.keys(schema));
  };  
};

module.exports = Game; // export class
