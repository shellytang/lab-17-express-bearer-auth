'use strict';

const debug = require('debug')('cfgram:gallery-controller');
const Promise = require('bluebird');
const createError = require('http-errors');
const Gallery = require('../model/gallery');

module.exports = exports = {};

exports.createGallery = function(user) {

  debug('#createGallery');
  return new Gallery(user).save()
  .then(gallery => gallery)
  .catch(err => Promise.reject(err));
};

exports.fetchGallery = function(id) {
  debug('#fetchGallery');

  return Gallery.findById(id)
  .then(gallery => Promise.resolve(gallery))
  .catch(err => Promise.reject(err));
};

exports.updateGallery = function(id, putGallery) {
  debug('#updateGallery');

  return Gallery.findByIdAndUpdate(id, {name: putGallery.name, mood: putGallery.mood}, {new: true})
  .then(gallery => Promise.resolve(gallery))
  .catch(err => Promise.reject(err));
};

exports.deleteGallery = function(id) {
  debug('#deleteGallery');

  return Gallery.findByIdAndRemove(id)
  .then(gallery => Promise.resolve(gallery))
  .catch(err => Promise.reject(createError(404, 'Not found')));
};
