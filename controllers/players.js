const Player = require('../models/player');


module.exports = {
  new: newplayer,
  create,
  show,
  showAll,
  delete: deleteplayer
};

// async function deleteplayer(req, res) {
//   const player = await Player.findOne({ 'player._id': req.params.id, 'player.user': req.user._id });
//   try{
//   //if (!player) return res.redirect('/players');
//   await player.deleteOne(req.params.id);
//   console.log("hello")
//   await player.save();
//   res.redirect(`/players/${player._id}`);
// } catch (err){
//   console.log(err);
//   res.render("index", {title: "Players"});
// }
// }
async function deleteplayer (req,res){
  const player = await Player.findById(req.params.id);
  try {
      await player.deleteOne(req.body);
      res.redirect("./"); 
  } catch (err){
      console.log(err);
      res.render("index", {title: "Player"});
  }
}

async function show(req, res){
  const player = await Player.findById(req.params.id)
 res.render('players/show', {title: 'Player Stats', player });
}
// async function addToList(req, res) {
//   const stat = await stat.findById(req.params.id);
//   // The list array holds the player's ObjectId (referencing)
//   stat.list.push(req.body.playerId);
//   await stat.save();
//   res.redirect(`/stats/${stat._id}`);
//}

async function newplayer(req, res) {
  //Sort players by their name
  const players = await Player.find({}).sort('name');
  console.log(players)
  res.render('players/new', { title: 'Add player', players });
}

async function create(req, res) {
  //req.body.born += 'T00:00';
  console.log(req.body)
  console.log(req.params)
  req.body.goals = parseInt(req.body.goals);
  req.body.assists = parseInt(req.body.assists);
  try {
    await Player.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/players/showAll');
}

async function showAll(req, res) {
  const players = await Player.find({})
  res.render('players', {title: 'All Players', players})
}