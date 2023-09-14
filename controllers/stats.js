const Stat = require('../models/stat');
const Player = require('../models/player');

module.exports = {
  index,
  show,
  new: newstat,
  create
};

async function index(req, res) {
  const stats = await Stat.find({});
  res.render('stats/index', { title: 'All Stats', stats });
}

async function show(req, res) {
  
  const stat = await Stat.findById(req.params.id).populate('list');
  const players = await Player.find({ _id: { $nin: stat.list } }).sort('name');
  res.render('stats/show', { title: 'Stat Detail', stat, players });
}

function newstat(req, res) {
  res.render('stats/new', { title: 'Add stat', errorMsg: '' });
}

async function create(req, res) {
  
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const stat = await Stat.create(req.body);
    res.redirect(`/stats/${stat._id}`);
  } catch (err) {
    console.log(err);
    res.render('stats/new', { errorMsg: err.message });
  }
}