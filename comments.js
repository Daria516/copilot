// Create web server
var express = require('express');
var router = express.Router();

// Create database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create schema for comments
var commentSchema = mongoose.Schema({
    name: String,
    comment: String
});

// Create model for comments
var Comment = mongoose.model('Comment', commentSchema);

// POST route for comments
router.post('/comments', function(req, res, next) {
    var newComment = new Comment(req.body);
    newComment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

// GET route for comments
router.get('/comments', function(req, res, next) {
    Comment
        .find()
        .then(function(doc) {
            res.json(doc);
        });
});

module.exports = router;