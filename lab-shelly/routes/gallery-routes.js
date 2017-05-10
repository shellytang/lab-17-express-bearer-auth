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

    console.log('headers', req.headers);

    galleryController.fetchGallery(req.params.id)
    .then(gallery => {

      console.log('gallery in routes!', gallery);
      console.log('what is galleryuserid ', gallery.userId);
      console.log('waht is userid ', req.user._id);
      
      if(gallery.userId.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid user');
      }
      res.json(gallery);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;

};
