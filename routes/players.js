const express = require('express');
const router = express.Router();
const playersCtrl = require('../controllers/players');
const ensureLoggedIn = require('../config/ensureLoggedIn');




router.get('/players/new', ensureLoggedIn, playersCtrl.new);
router.post('/players', ensureLoggedIn, playersCtrl.create);
router.post('/stats/:id/players', ensureLoggedIn, playersCtrl.addToList);

module.exports = router;