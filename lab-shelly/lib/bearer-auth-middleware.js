'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('cfgram:bearer-auth-middleware');
const User = require('../model/user');

module.exports = function(req, res, next) {
  debug('bearer-auth-middleware');
  console.log('the auth: ', req.headers.authorization);
  let authHeaders = req.headers.authorization;
  if(!authHeaders) return next(createError(401, 'Authorization headers required'));

  let token = authHeaders.split('Bearer ')[1];
  if(!token) return next(createError(401, 'Token required'));

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {

    console.log('what was decoded?? ', decoded.token);

    if(err) return next(err);

    User.find({findHash: decoded.token})
    .then(user => {
      console.log('USER???', user);
      req.user = user[0];
      next();
    })
    .catch(err => next(createError(401, err.message)));
  });
};
