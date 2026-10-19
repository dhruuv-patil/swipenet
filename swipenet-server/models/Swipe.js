import mongoose from 'mongoose';

const swipeSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      default: null,
    },
    direction: {
      type: String,
      enum: ['left', 'right', 'bookmark'],
      required: true,
    },
    context: {
      compatibilityScore: {
        type: Number,
        default: 0,
      },
      matchedSkills: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

// Prevent duplicate swipes for same pair
swipeSchema.index({ fromUser: 1, toUser: 1, jobId: 1 }, { unique: true });

const Swipe = mongoose.model('Swipe', swipeSchema);

export default Swipe;
