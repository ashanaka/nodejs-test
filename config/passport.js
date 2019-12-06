const LocalStrategy  = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('User');

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    // Match user
    User.findOne({
      email:email
    }).then(User => {
      if(!User){
        return done(null, false, {message: 'No User Found'});
      } 

      // Match password
      bcrypt.compare(password, User.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null, User);
        } else {
          return done(null, false, {message: 'Password Incorrect'});
        }
      })
    })
  }));

  passport.serializeUser(function(User, done) {
    done(null, User.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, User) {
      done(err, User);
    });
  });
}