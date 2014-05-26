module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/accueil', isLoggedIn, function(req, res) {
    res.render('accueil.ejs');
  });

  app.get('/integration', isLoggedIn, function(req, res){
    res.render('integration.ejs');
  });

  app.get('/campagne', isLoggedIn, function(req, res){
    res.render('campagne.ejs');
  });

  app.get('/or', isLoggedIn, function(req, res){
    res.render('or.ejs');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/login', function(req, res) {
      res.render('login.ejs');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/accueil', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
    }));

    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
        return next();
      res.redirect('/');
    }

}
