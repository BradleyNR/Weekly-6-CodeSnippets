const LoginController = {
  login: function(req, res){
    res.render('login/login', {
      messages: res.locals.getMessages()
    });
  },
  loggedIn: function(req, res){
    res.redirect('/');
  },
  signup: function(req, res){
    res.render('login/signup', {
      messages: res.locals.getMessages()
    });
  }
};

module.exports = LoginController;
