// schemas

module.exports = {
  user: {
    id: null,
    name: null,
    password: null
  },
  game: {
    id: null,
    user_id: null,
    classroom_id: null,
    date_accessed: null
  },
  stage: {
    stage_id: null,
    game_id: null,
    date_started: null,
    date_updated: null,
    date_completed: null,
    attempts: 0,
    code: null,
  }
}
