'use strict';

const debug = require('debug')('cfgram:gallery-routes');
const Gallery = require('../model/gallery');
const galleryController = require('../controller/gallery-controller');
const bearerAuth = require('../lib/bearer-auth-middleware');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');

    req.body.userId = req.user._id;

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
    .then(gallery => {
      if(gallery.userId.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid user');
      }
      res.json(gallery);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery/:id');

    console.log('what is in body ', req.body);
    let putGallery = req.body;
    
    galleryController.updateGallery(req.params.id, putGallery)
    .then(gallery => {
      if(gallery.userId.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid user');
      }
      res.json(gallery);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  // router.delete('/gallery/:id', bearerAuth, (req, res) => {
  //   debug('#DELETE /api/gallery/:id');
  //
  // });

  return router;
};
