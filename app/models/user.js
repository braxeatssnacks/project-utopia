// user
const _ = require('lodash');
const schemas = require('./schemas.js');
const pool = require(`${__dirname}/../utils/database.js`);

let Util = require(`${__dirname}/../utils/util.js`); // utility

var User = function(data) {
  // create appropriate struct
  this.data = this.sanitize(data);
};


/* IMPLEMENTATION INHERITED METHODS  */

User.prototype.data = {};

// change object data name property 
User.prototype.changeName = function(name) {
  this.data.name = name;
};

// change object data email property 
User.prototype.changeEmail = function(email) {
  this.data.email = email;
};

// retrieve object data name property 
User.prototype.getName = function() {
  return this.data.name;
};

// retrieve object data email property 
User.prototype.getEmail = function() {
  return this.data.email;
};

// sanitize USER struct
User.prototype.sanitize = function(data) {
  data = data || {};
  schema = schemas.user;
  return _.pick(_.defaults(data, schema), _.keys(schema));
};

// INSERT user info into db
User.prototype.save = function(callback) {
  var self = this;
  self.data = self.sanitize(self.data);

  // query
  var q = Util.SQL`INSERT INTO users(\
    name,\
    email,\
    password\
  )\ 
  VALUES(\
    ${self.data.name.trim()},\
    ${self.data.email.trim()},\
    ${self.data.password.trim()}\
  )`;

  pool.query(q, function(err, data) { 
    if (err) return callback(err); 
    return callback(null, true); // return success
  });
};


/* STATIC METHODS */

// locate user info in db by id
User.findByID = function(id, callback) {
  // query
  var q = Util.SQL`SELECT * FROM users WHERE id=${id}`;
  pool.query(q, function(err, data) { 
    if (err) return callback(err);
    return callback(null, new User(data)); // return User
  });
};

module.exports = User; // export class
