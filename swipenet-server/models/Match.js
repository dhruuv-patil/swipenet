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

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      default: null,
    },

    stage: {
      type: String,
      enum: ['matched', 'chatting', 'interview', 'offer', 'closed', 'expired'],
      default: 'matched',
    },

    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 48 * 60 * 60 * 1000), // 48-hour response countdown
      index: true,
    },

    firstMessageBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    firstMessageAt: {
      type: Date,
      default: null,
    },

    suggestedIcebreakers: [
      {
        prompt: { type: String, required: true },
        reason: { type: String, default: '' },
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

    metadata: {
      interviewScheduledAt: Date,
      calendarLink: String,
    },
  },
  { timestamps: true }
);

matchSchema.index({ expiresAt: 1, stage: 1 });

const Match = mongoose.model('Match', matchSchema);

export default Match;
