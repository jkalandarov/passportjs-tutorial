var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');

var router = express.Router();

passport.use(new LocalStrategy(function verify(username, password, cb){
    db.get(
        'SELECT rowid AS id, * FROM users WHERE username = ?',
        [username],
        function (err, row) {
            if (err) { return cb(err); }
            if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        }
    )
}))

router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;