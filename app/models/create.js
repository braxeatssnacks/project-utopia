// SQL table creation

/* TABLE CREATION */
pg.connect(postgrepost, function(err, clientOrg, done) { // USERS table     
  clientOrg.query('CREATE TABLE IF NOT EXISTS users(\
    id integer, \
    name varchar(100), \
    email varchar(100), \
    password varchar(150), \
    PRIMARY KEY(id))'
  );
});
pg.connect(postgrepost, function(err, clientOrg, done) { // GAMES table
  clientOrg.query('CREATE TABLE IF NOT EXISTS games(\
    id integer, \
    user_id integer, \
    classroom_id varchar(50), \
    last_accessed_date date, \
    email varchar(100), \
    PRIMARY KEY(id), \
    FOREIGN KEY(user_id) REFERENCES users)'
  );
});
pg.connect(postgrepost, function(err, clientOrg, done) { // STAGES table
  clientOrg.query('CREATE TABLE IF NOT EXISTS stages(\
    id integer, \
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
  );
});
