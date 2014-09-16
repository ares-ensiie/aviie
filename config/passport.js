var OAuth2Strategy = require('passport-oauth2').Strategy;
var request = require("request");
module.exports = function(passport) {
   // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    var Token = null;

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(username, done) {
      request( {
        url: "http://api.iiens.eu/users/" + username
          + "?access_token=" + Token
          + "&client_id=" + process.env.CLIENT_ID
          + "&client_secret=" + process.env.CLIENT_SECRET,
        json: true
      }, function(err, res, user){
        if(err){
          console.log("Error finding the user" + username);
        } else {
          console.log(user);
          done(err, user);
        }
      });
    });

    //Oauth
    OAuth2Strategy.prototype.userProfile = function(token, done) {
      request({ url: "http://api.iiens.eu/users/self?access_token=" + token, json: true }, function(err, response, me) {
        if(err) {
          console.log("Error while retrieving personal information: " + err);
        }
        else {
          done(err, me);
        }
      });
    };

    passport.use(new OAuth2Strategy({
      authorizationURL: "http://www.iiens.eu/oauth/authorize",
      tokenURL: "http://www.iiens.eu/oauth/token",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth",
      },
      function(accessToken, refreshToken, profile, done) {
        Token = accessToken
        console.log(Token)
        return done(null, profile);
      }
    ));
}
