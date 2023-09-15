var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Team player/showAll' });
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
    successRedirect: '/players/showAll',
    failureRedirect: '/players/showAll'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/players/showAll');
  });
});;



module.exports = router;
