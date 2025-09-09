import mongoose from "mongoose";

const jobseekerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links to your User model
      required: true,
    },

    // Basic Info
    bio: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: [
      {
        title: { type: String, required: true }, // e.g., Intern, Web Dev
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: Number },
      },
    ],

    // Extra Details
    portfolioLinks: [
      {
        label: { type: String }, // e.g., GitHub, LinkedIn
        url: { type: String },
      },
    ],
    resume: {
      type: String, // store file URL if you allow uploads
    },

    // Preferences
    lookingFor: {
      type: String, // e.g., Internship, Part-time, Full-time
    },
    jobType: {
      type: String, // Remote, Onsite, Hybrid
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobseekerProfile", jobseekerProfileSchema);
