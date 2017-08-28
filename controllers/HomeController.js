const User = require('../models/user');
const Snippet = require('../models/snippet');

// TODO: when creating my add controller, pass the req.user._id in as
//the user key on the snippet.js schema.
//in the below example, you could set game: req.body.entry instead to user: req.user._id
//example: Entry.findByIdAndUpdate(entryId, {$set: {game: req.body.entry, genre: req.body.genre}}).then(function(){
      //   console.log('working');
      //   res.redirect('/');
      // })

const HomeController = {
  index: function(req, res){
    //only find snippets that were created by logged in user
    const userId = req.user._id;
    Snippet.find({'user': userId}).then(function(snippet){
      res.render('index/mainpage', {snippet: snippet});
    })
  },
  add: function(req, res){
    res.render('edit/add');
  },
  create: function(req, res){
    let title = req.body.title;
    let body = req.body.bodytext;
    let notes = req.body.notes;
    let language = req.body.language;
    let tags = req.body.tags;
    let newSnippet = new Snippet({title: title, body: body, notes: notes, language: language, tags: tags, user: req.user._id});
    newSnippet.save(function(){
      res.redirect('/');
    })
  },
  delete: function(req, res){
    let entryId = req.params.id;
    Snippet.deleteOne({"_id": entryId}).then(function(){
      res.redirect('/');
    })
  },
  logout: function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  },
  search: function(req, res){
    res.render('search/search');
  },
  findcode: function(req, res){
    let entryId = req.params.id;
    console.log(entryId);
    Snippet.findOne({"_id": entryId}).then(function(entry){
      //passing data in as below, do not need dot noatation in handlebars
      res.render('edit/edit', entry);
    })
  },
  update: function(req, res){
    let entryId = req.params.id;
    Snippet.findByIdAndUpdate(entryId, {$set: {title: req.body.title, body: req.body.bodytext, notes: req.body.notes, language: req.body.language, tags: req.body.tags}}).then(function(){
        res.redirect('/');
    })
  },
  view: function(req, res){
    let entryId = req.params.id;
    Snippet.findOne({"_id": entryId}).then(function(entry){
      //passing data in as below, do not need dot noatation in handlebars
      res.render('search/view', entry);
    })
  }
};

module.exports = HomeController;
