const mongoose = require('mongoose');

const shortlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel', 
    required: true,
    unique: true, 
  },
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel',
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Shortlist', shortlistSchema);
