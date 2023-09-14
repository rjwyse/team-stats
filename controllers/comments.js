const stat = require('../models/stat');

module.exports = {
  create,
  // Add this export
  delete: deleteComment
};

async function deleteComment(req, res) {
  const stat = await stat.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
  if (!stat) return res.redirect('/stats');
  stat.comments.remove(req.params.id);
  await stat.save();
  res.redirect(`/stats/${stat._id}`);
}

async function create(req, res) {
  const stat = await stat.findById(req.params.id);

  // Add the user-centric info to req.body (the new comment)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  stat.comments.push(req.body);
  try {
    // Save any changes made to the stat doc
    await stat.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/stats/${stat._id}`);
}