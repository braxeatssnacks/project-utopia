const pg = require('pg');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(`${__dirname}/../../config.json`));

// info
var dbConfig = {
  user: process.env.PGUSER || config.db.user,
  password: process.env.PGPASSWORD || config.db.password,
  database: process.env.PGDATABASE || config.db.database,
  host: process.env.PGHOST || conig.db.host,
  port: process.env.PGPORT || config.db.port,
  max: config.db.max, // maximum num of clients in pool
  idleTimeoutMillis: config.db.idleTimeoutMillis // how long client can remain idle before closure
};

// initialize connection pool
const pool = new pg.Pool(dbConfig);

// log idle client error
pool.on('error', function(err, client) {
  console.error('idle client error ', err.message, err.stack);
});

/* GLOBAL ACCESS METHODS */

// global query method to pool
module.exports.query = function(str, vals, callback) {
  // console.log('query: ', str, vals);
  return pool.query(str, vals, callback)
};
// checking out client for multiple operations
module.exports.connect = function(callback) {
  return pool.connect(callback);
};
