const player = require('../models/player');

module.exports = {
  create,
}

async function create(req, res) {
  const player = await player.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  player.highlight.push(req.body);
  try {
    // Save any changes made to the player doc
    await player.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/players/${player._id}`);
}