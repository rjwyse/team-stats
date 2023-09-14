const stat = require('../models/stat');
const Player = require('../models/player');

module.exports = {
  index,
  show,
  new: newstat,
  create
};

async function index(req, res) {
  const stats = await stat.find({});
  res.render('stats/index', { title: 'All Stats', stats });
}

async function show(req, res) {
  
  const stat = await stat.findById(req.params.id).populate('list');
  const players = await player.find({ _id: { $nin: stat.list } }).sort('name');
  res.render('stats/show', { title: 'stat Detail', stat, players });
}

function newstat(req, res) {
  res.render('stats/new', { title: 'Add stat', errorMsg: '' });
}

async function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const stat = await stat.create(req.body);
    res.redirect(`/stats/${stat._id}`);
  } catch (err) {
    console.log(err);
    res.render('stats/new', { errorMsg: err.message });
  }
}