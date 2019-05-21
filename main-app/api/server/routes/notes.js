const passport = require('passport');
//  const knex = require('../config/knex_config.js');
const notes = require('./notesData');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.get('/notes/:id', jwtAuth, (req, res) => {
    //  knex??
    console.log(notes);
    res.status(200).send(notes);
  });
};
