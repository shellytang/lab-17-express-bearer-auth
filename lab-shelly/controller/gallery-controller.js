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

  return Gallery.findById(id)
  .then(gallery => Promise.resolve(gallery))
  .catch(err => Promise.reject(err)); //create 404 user not found error?
};

exports.updateGallery = function(id, putGallery) {
  debug('#updateGallery');

  return Gallery.findByIdAndUpdate(id, {name: putGallery.name, mood: putGallery.mood}, {new: true})
  .then(gallery => Promise.resolve(gallery))
  .catch(err => Promise.reject(err)); //create 404 user not found error?

};

exports.deleteGallery = function() {
  debug('#deleteGallery');


};
