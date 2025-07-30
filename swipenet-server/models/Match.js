import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    matchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema);

export default Match;
