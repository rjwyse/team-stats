const express = require('express');
const router = express.Router();
const playersCtrl = require('../controllers/players');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.delete('/players/:id', ensureLoggedIn, playersCtrl.delete);
router.get('/new', ensureLoggedIn, playersCtrl.new);
router.get('/showAll', ensureLoggedIn, playersCtrl.showAll);
router.post('/', ensureLoggedIn, playersCtrl.create);


router.get('/:id',playersCtrl.show)

router.post('/:id/addStats', function (req, res) {
    const playerId = req.params.id;
    const { statName, statValue } = req.body;
  
    // Validate and save the new stat record for the player in the database
    // Redirect back to the player details page after adding stats
  });

module.exports = router;