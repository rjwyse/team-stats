var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Team Stats' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/stats',
    failureRedirect: '/stats'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/stats');
  });
});

module.exports = router;
