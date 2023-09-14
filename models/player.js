const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  born: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);