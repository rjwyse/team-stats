const Player = require('../models/player');

module.exports = {
  create,
  // Add this export
  delete: deleteComment
};

async function deleteComment(req, res) {
  const player = await Player.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
  if (!player) return res.redirect('/players');
  player.comments.remove(req.params.id);
  await player.save();
  res.redirect(`/players/${player._id}`);
}

async function create(req, res) {
  const player = await Player.findById(req.params.id);

  // Add the user-centric info to req.body (the new comment)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  player.comments.push(req.body);
  try {
    // Save any changes made to the player doc
    await player.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/players/${player._id}`);
}