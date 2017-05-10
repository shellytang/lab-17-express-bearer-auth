'use strict';

const debug = require('debug')('cfgram:gallery-routes');
const Gallery = require('../model/gallery');
const galleryController = require('../controller/gallery-controller');
const bearerAuth = require('../lib/bearer-auth-middleware');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');

    console.log('what is here: ', req.body);

    console.log('WHAT is _id: ', req.user._id);

    req.body.userId = req.user._id;  //attach user obj from database and attach to request
    console.log('WHAT userID: ', req.body.userId);
    // new Gallery(req.body).save()
    console.log('WHAT IS BODY NOW?: ', req.body);
    galleryController.createGallery(req.body)
    .then(gallery => res.json(gallery))
    .catch(err => {
      console.log(err);
      res.status(err.status).send(err.message);
    });
  });

  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');
    galleryController.fetchGallery(req.params.id)
    .then(gallery => res.json(gallery))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;

};
