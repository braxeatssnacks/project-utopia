// PostgreSQL DB creation

var CREATE_DB_STRUCT = {
 
  // USERS table     
  usersTable: 'CREATE TABLE IF NOT EXISTS users(\
  id SERIAL PRIMARY KEY, \
  name varchar(100), \
  email varchar(100), \
  password varchar(150), \
  PRIMARY KEY(id))',

  // GAMES table
  gamesTable:'CREATE TABLE IF NOT EXISTS games(\
  id SERIAL PRIMARY KEY, \
  user_id integer, \
  classroom_id varchar(50), \
  last_accessed_date date, \
  email varchar(100), \
  PRIMARY KEY(id), \
  FOREIGN KEY(user_id) REFERENCES users)',

  // STAGES table
  stagesTable: 'CREATE TABLE IF NOT EXISTS stages(\
  id SERIAL PRIMARY KEY, \
  user_id integer, \
  classroom_id varchar(50), \
  date_started date, \
  date_updated date, \
  date_completed date, \
  attepmts integer, \
  code varchar(5000), \
  game_id integer, \
  PRIMARY KEY(id), \
  FOREIGN KEY(user_id) REFERENCES users, \
  FOREIGN KEY(classroom_id) REFERENCES games)'
};

module.exports = CREATE_DB_STRUCT;
