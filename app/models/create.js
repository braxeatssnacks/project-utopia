// PostgreSQL DB creation

var CREATE_DB_STRUCT = {
 
  // USERS table     
  usersTable: 'CREATE TABLE IF NOT EXISTS users(\
  id SERIAL PRIMARY KEY, \
  name varchar(100), \
  email varchar(100), \
  password varchar(150)',

  // GAMES table
  gamesTable:'CREATE TABLE IF NOT EXISTS games(\
  id SERIAL PRIMARY KEY, \
  user_id integer, \
  classroom_id varchar(50), \
  current_stage integer,\
  date_accessed date, \
  FOREIGN KEY(user_id) REFERENCES users),',

  // STAGES table
  stagesTable: 'CREATE TABLE IF NOT EXISTS stages(\
  id PRIMARY KEY, \
  classroom_id varchar(50), \
  date_started date, \
  date_updated date, \
  date_completed date, \
  attempts integer, \
  code varchar(5000), \
  game_id integer, \
  FOREIGN KEY(game_id) REFERENCES games)'
};

module.exports = CREATE_DB_STRUCT;
