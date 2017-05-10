'use strict';

const debug = require('debug')('cfgram:gallery-controller');
const Promise = require('bluebird');
const createError = require('http-errors');
const Gallery = require('../model/gallery');

module.exports = exports = {};

exports.createGallery = function(user) {

  debug('#createGallery');
  return new Gallery(user).save()
  .then(() => user)
  .catch(err => Promise.reject(err));
};

exports.fetchGallery = function(id) {
  debug('#fetchGallery');

  Gallery.findById(id)
  .then(gallery => {
    if(gallery.userId.toString() !== id.toString()) {
      return createError(401, 'Invalid user');
    }
  })
  .then(gallery => Promise.resolve(gallery))
  .catch(err => Promise.reject(err));

  // .catch(err => Promise.reject(createError(401, 'Invalid user'));

};
