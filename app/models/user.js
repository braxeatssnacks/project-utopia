// user

const pg = require('pg');
const _ = require('lodash');
const schemas = require('./schemas.js');

const connectionString = process.env.DATABASE_URL || config;

var User = function(data) {
  // replace 
  this.data = this.sanitize(data); 

   

  // sanitize USER struct
  this.sanitize = function(data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
  };  
};


/* IMPLEMENTATION INHERITED METHODS  */

// INSERT user info into db
User.prototype.save() = function(callback) {
  var self = this;

  // get 'USERS' table
  function(err, data) { // callback
    if (err) return callback(err); // handle error 
    callback(null, true); // return success
  }
};


/* STATIC METHODS */

// locate user info in db by id
User.findByID = function(id, callback) {
  // make query
  function(err, data) { // callback
    if (err) return callback(err); // handle error 
    callback(null, new User(data)); // return User
  }
};

module.exports = User; // export class
