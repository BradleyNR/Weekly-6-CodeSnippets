const User = require('../models/user');

const HomeController = {
  index: function(req, res){
    res.render('index/mainpage');
  }
};

module.exports = HomeController;
