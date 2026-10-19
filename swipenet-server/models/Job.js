import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    salaryRange: {
      type: String,
      required: true, // Mandatory salary transparency policy
    },
    location: {
      type: String,
      default: 'Remote',
    },
    remoteType: {
      type: String,
      enum: ['remote', 'hybrid', 'onsite'],
      default: 'remote',
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    niceToHaveSkills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      default: '3+ years',
    },
    description: {
      type: String,
      default: '',
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
