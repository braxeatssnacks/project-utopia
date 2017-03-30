const pg = require('pg');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../../config.json')); 

// info
var username = process.env.PGUSER || config.db.username;
var password = process.env.PGPASSWORD || config.db.password;
var dbName = process.env.PGPASSWORD || config.db.password;
var host =  config.db.host;

const postgrepre = `postgres://${username}:${password}@${host}/postgres`;
const postgrepost = `postgres://${username}:${password}@${host}/postgres/${dbName}`;

pg.connect(postgrepre, function(err, client, done) { // connect to postgres db
  if (err) { console.log('Error while connecting: ' + err); }

  /* DB CREATION */
  client.query(`CREATE DATABASE ${dbName}`, function(err) { // create local db
    if (err) { console.log('ignoring err ...'); } // ignore db if present
    client.end(); // close the connection

    /* TABLE CREATION */
    pg.connect(postgrepost, function(err, clientOrg, done) { // USERS table     
      clientOrg.query(`CREATE TABLE IF NOT EXISTS users( name varchar(100), email varchar(100), password varchar(150), PRIMARY KEY(email))`);
    });
    pg.connect(postgrepost, function(err, clientOrg, done) { // GAMES table
      clientOrg.query(`CREATE TABLE IF NOT EXISTS games(game_id integer, classroom_id varchar(50), last_accessed_date date, email varchar(100), PRIMARY KEY(game_id), FOREIGN KEY(email) REFERENCES 'USERS')`);
    });
    pg.connect(postgrepost, function(err, clientOrg, done) { // STAGES table
      clientOrg.query(`CREATE TABLE IF NOT EXISTS 'STAGES' (stage_number integer, date_started date, date_updated date, date_completed date, attepmts integer, code varchar(5000), email varchar(100), game_id integer, classroom_id varchar(50), PRIMARY KEY(stage_number), FOREIGN KEY(email) REFERENCES 'USERS', FOREIGN KEY(classroom_id) REFERENCES 'GAMES')`);
    });

  });
});
