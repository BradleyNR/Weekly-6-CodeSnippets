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
    let tagsArr = tags.split(',');
    let newSnippet = new Snippet({title: title, body: body, notes: notes, language: language, tags: tagsArr, user: req.user._id});
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
    let tags = req.body.tags.trim();
    let tagsArr = tags.split(',');
    Snippet.findByIdAndUpdate(entryId, {$set: {title: req.body.title, body: req.body.bodytext, notes: req.body.notes, language: req.body.language, tags: tagsArr}}).then(function(){
        res.redirect('/');
    })
  },
  view: function(req, res){
    let entryId = req.params.id;
    Snippet.findOne({"_id": entryId}).then(function(entry){
      //passing data in as below, do not need dot noatation in handlebars
      res.render('search/view', entry);
    })
  },
  language: function(req, res){
    let userId = req.user._id;
    let searchTerm = req.body.langsearch;
    //finds snippets that have the correct user ID and that have the search term included in the language key
    Snippet.find({$and: [{user: userId},{language: {$in: [searchTerm]}}]}).then(function(entry){
      res.render('index/mainpage', {snippet: entry});
    })
  },
  tags: function(req, res){
    let userId = req.user._id;
    let tagSearch = req.body.tagsearch;
    Snippet.find({$and: [{user: userId},{tags: {$in: [tagSearch]}}]}).then(function(entry){
      res.render('index/mainpage', {snippet: entry});
    })
  }
};

module.exports = HomeController;
