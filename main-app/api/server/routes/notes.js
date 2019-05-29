const passport = require('passport');
const knex = require('../config/knex_config.js');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  //  get all notes by a certain participant
  app.get('/notes/:participantId', jwtAuth, (req, res) => {
    const { participantId: id } = req.params;

    knex('notes').where('participant_id', id).select()
      .then(notes => res.status(200).send(notes))
      .catch(err => res.status(500).send(err));
  });

  //  post a new note to the participant
  app.post('/note/:participantId', jwtAuth, (req, res) => {
    // knex???
    console.log('response: note here');
    res.status(201).send('note good');
  });

  //  get an individual note by note id
  app.get('/note/:noteId', jwtAuth, (req, res) => {
    // knex???
    console.log('response: note here');
    res.status(200).send(['hi']);
  });

  //  put to edit an individual note by note id
  app.put('/note/:noteId', jwtAuth, (req, res) => {
    // knex???
    console.log('response: note here');
    res.status(200).send(['hi']);
  });

  //  patch an individual note by note id to change it to closed status
  app.patch('/note/:noteId', jwtAuth, (req, res) => {
    // knex???
    console.log('response: note here');
    res.status(200).send(['hi']);
  });
};
