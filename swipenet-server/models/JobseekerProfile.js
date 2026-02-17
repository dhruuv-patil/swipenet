import mongoose from "mongoose";

const jobseekerProfileSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      
    },

    // ✅ Mandatory fields
    fullName: { type: String, trim: true, required: true },
    tagline: { type: String, trim: true, required: true },
    currentRole: { type: String, trim: true, required: true },
    employmentType: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    preferredIndustry: { type: String, required: true },
    location: { type: String, trim: true, required: true },
    lookingFor: { type: String, required: true },

    // ✅ Optional fields
    linkedinUrl: { type: String },
    bio: { type: String, trim: true },
    profileImage: { type: String },

    // Require at least 1 skill
    skills: {
      type: [String],
      trim: true,
      validate: {
        validator: (val) => val.length > 0,
        message: "At least one skill is required",
      },
      required: true,
    },

    experience: [
      {
        title: { type: String, required: true },
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

    portfolioLinks: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],

    resume: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("JobseekerProfile", jobseekerProfileSchema);
