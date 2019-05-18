const passport = require('passport');
//  const knex = require('../config/knex_config.js');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.get('/notes/:id', jwtAuth, (req, res) => {
    //  knex??
    console.log(req.params.id);
    res.status(200).send('hello');
  });
};
