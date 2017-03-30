// user
const _ = require('lodash');
const schemas = require('./schemas.js');
const pool = require(`${__dirname}/../utils/database.js`);

let Util = require(`${__dirname}/../utils/util.js`); // utility

/* CONSTRUCTOR */

var User = function(data) {
  // create appropriate struct
  this.data = this.sanitize(data);
};

User.prototype.data = {};

/* IMPLEMENTATION INHERITED METHODS  */

// change object data name property
User.prototype.changeName = function(name) {
  var self = this;
  sef.data.name = name;

  // query
  var q = Util.SQL`UPDATE users SET name=${self.data.name}\
    WHERE id=${self.data.id}`;

  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, true); // return success
  });
};

// change object data email property
User.prototype.changeEmail = function(email) {
  var self = this;
  self.data.email = email;

  // query
  var q = Util.SQL`UPDATE users SET email=${self.data.email}\
    WHERE id=${self.data.id}`;

  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, true); // return success
  });
};

// change object data email property
User.prototype.changePassword = function(pass) {
  var self = this;
  self.data.pass = pass; // TODO: hash function
};

// retrieve object data property
User.prototype.get = function(property) {
  return this.data[property];
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

  if (self.data.id == null) { // new entry
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
  }
  return callback("entry already exists: update instead of save"); // existing entry
};


/* STATIC METHODS */

// SELECT user info retrieve by id
User.findByID = function(id, callback) {
  // query
  var q = Util.SQL`SELECT * FROM users WHERE id = ${id}`;
  pool.query(q, function(err, data) {
    if (err) return callback(err);
    return callback(null, new User(data.rows[0]).data); // return User
  });
};

module.exports = User; // export class
