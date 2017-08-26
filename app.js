const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      session = require('express-session'),
      flash = require('express-flash-messages');
const User = require('./models/user');
//express
const app = express();

//views
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//database
var database = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(database);
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'the biggest baddest man in the saloon',
    resave: false,
    saveUninitialized: false,
}));

//setting up passport
passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
      User.authenticate(username, password, function(err, user) {
          if (err) {
              return done(err)
          }
          if (user) {
              return done(null, user)
          } else {
              return done(null, false, {
                  message: "There is no user with that username and password."
              })
          }
      })
  }));

passport.use('local-signup', new LocalStrategy(
  function(username, password, done){
    User.signup(username, password, function(err, user){
      if (err) {
          return done(err)
      }
      if (user) {
          return done(null, user)
      } else {
          return done(null, false, {
              message: "There is already a user with that username."
          });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//passing app into routes
routes(app);

app.listen(process.env.PORT || 3000);
