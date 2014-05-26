var OAuth2Strategy = require('passport-oauth2').Strategy;
var request = require("request");
module.exports = function(passport) {
   // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Oauth
    OAuth2Strategy.prototype.userProfile = function(token, done) {
      request({ url: "http://api.iiens.eu/users/self?access_token=" + token }, function(err, response, me) {
        if(err) {
          console.log("Error while retrieving personal information: " + err);
        }
        else {
          var me = JSON.parse(me);
          done(err, me);
        }
      });
    }

    passport.use(new OAuth2Strategy({
      authorizationURL: "http://www.iiens.eu/oauth/authorize",
      tokenURL: "http://www.iiens.eu/oauth/token",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth",
    }
    /*function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({"local.username": profile.username}, function (err, user) {
        if(!user || err){
          var newUser = new User();
          newUser.local.username = profile.username;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          })
        }
        else {
          return done(err, user);
        }
      });
    }*/));


}
