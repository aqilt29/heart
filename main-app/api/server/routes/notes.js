const passport = require('passport');
//  const knex = require('../config/knex_config.js');
const notes = require('./notesData');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  //  get all notes by a certain participant
  app.get('/notes/:participantId', jwtAuth, (req, res) => {
    //  knex??
    console.log(notes);
    res.status(200).send(notes);
  });

  //  get an individual note by note id
  app.get('/note/:noteId', jwtAuth, (req, res) => {
    // knex???
    console.log('response: note here');
    res.status(200).send(notes[0]);
  });

  //  put to edit an individual note by note id
  app.put('/note/:noteId', jwtAuth, (req, res) => {
    // knex???
    console.log('response: note here');
    res.status(200).send(notes[0]);
  });

  //  patch an individual note by note id to change it to closed status
  app.patch('/note/:noteId', jwtAuth, (req, res) => {
    // knex???
    console.log('response: note here');
    res.status(200).send(notes[0]);
  });
};
