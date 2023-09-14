const Player = require('../models/player');
const stat = require('../models/stat');

module.exports = {
  new: newplayer,
  create,
  addToList
};

async function addToList(req, res) {
  const stat = await stat.findById(req.params.id);
  // The list array holds the player's ObjectId (referencing)
  stat.list.push(req.body.playerId);
  await stat.save();
  res.redirect(`/stats/${stat._id}`);
}

async function newplayer(req, res) {
  //Sort players by their name
  const players = await player.find({}).sort('name');
  res.render('players/new', { title: 'Add player', players });
}

async function create(req, res) {
  req.body.born += 'T00:00';
  try {
    await Player.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/players/new');
}