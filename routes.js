const express = require('express');
const passport = require('passport');

const HomeController = require('./controllers/HomeController');
const LoginController = require('./controllers/LoginController');

//this works and is fine
const requireLogin = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = function(app){
  const homeRouter = express.Router();
  const loginRouter = express.Router();

  //requires login to see these pages
  homeRouter.use(requireLogin);
  homeRouter.get('/', HomeController.index);

  loginRouter.get('/login', LoginController.login);
  loginRouter.get('/signup', LoginController.signup);
  loginRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  loginRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.use('/', loginRouter);
  app.use('/', homeRouter);
}
