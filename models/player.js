const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

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
    comments: [commentSchema]

  }, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);