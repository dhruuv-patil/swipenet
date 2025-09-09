import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to main User model
      required: true,
    },

    // Company Info
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      trim: true, // e.g., IT, Marketing, Healthcare
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String, // About the company/startup
    },
    logo: {
      type: String, // URL of company logo
    },

    // Job/Internship Posts
    jobs: [
      {
        title: { type: String, required: true },
        type: { type: String, enum: ["Internship", "Full-time", "Part-time"] },
        skillsRequired: [{ type: String }],
        stipendOrSalary: { type: String },
        description: { type: String },
        postedAt: { type: Date, default: Date.now },
      },
    ],

    website: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("EmployerProfile", employerProfileSchema);
