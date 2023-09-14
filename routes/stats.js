const express = require('express');
const router = express.Router();

const statsCtrl = require('../controllers/stats');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
router.get('/', statsCtrl.index);
router.get('/new', ensureLoggedIn, statsCtrl.new);
router.get('/:id', statsCtrl.show);
router.post('/', ensureLoggedIn, statsCtrl.create);	

module.exports = router;