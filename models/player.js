const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
    position: {
      type: String,
      require:true
    },
    goals: {
      type: Number,
    require:true
    },
    assist: {
      type: Number,
      require:true
    },
  }, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);