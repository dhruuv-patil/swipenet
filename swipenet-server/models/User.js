import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    userType: {
      type: String,
      enum: ['jobseeker', 'employer', 'Job Seeker', 'Employer'],
      required: true,
    },

    title: {
      type: String,
      default: '',
    },

    company: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    salary: {
      type: String,
      default: '',
    },

    experience: {
      type: String,
      default: '',
    },

    teamSize: {
      type: String,
      default: '',
    },

    benefits: {
      type: String,
      default: '',
    },

    profilePic: {
      type: String,
      default: '',
    },

    location: {
      type: String,
      default: '',
    },

    swipedRight: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    swipedLeft: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
