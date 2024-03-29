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
    
      app.get('/autre', isLoggedIn, function(req, res){
    res.render('autre.ejs');
  });


    app.get('/assassine', isLoggedIn, function(req, res){
    res.render('assassine.ejs');
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

      app.get('/heroiik', function(req, res) {
    req.logout();
    res.render('heroiik.ejs');
  });

      app.get('/schizo', function(req, res) {
    req.logout();
    res.render('schizo.ejs');
  });

      app.get('/piirate', function(req, res) {
    req.logout();
    res.render('piirate.ejs');
  });

      app.get('/factiice', function(req, res) {
    req.logout();
    res.render('factiice.ejs');
  });
    
  app.get('/oauth', passport.authenticate('oauth2'));

   app.get('/auth',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/accueil');
    });



    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
        return next();
      res.redirect('/');
    }

}
