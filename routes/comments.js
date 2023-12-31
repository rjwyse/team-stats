const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /movies/:id/comments (create review for a movie)
router.post('/players/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE /comments
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;