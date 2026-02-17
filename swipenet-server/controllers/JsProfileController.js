import JobseekerProfile from "../models/JobseekerProfile.js";
import User from "../models/User.js"; // ✅ needed to update hasProfile

// fetch logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    console.log("🔹 req.user in getMyProfile:", req.user);
    const userId = req.user._id;
    const profile = await JobseekerProfile.findOne({ user: userId });

    if (!profile) {
      console.log("Profile not found for user:", userId);

      // ✅ Instead of 404, return a dummy default object (so frontend card works)
      return res.json({
        fullName: "Default User",
        tagline: "No tagline yet",
        currentRole: "N/A",
        employmentType: "N/A",
        experienceLevel: "N/A",
        preferredIndustry: "N/A",
        linkedinUrl: "",
        bio: "",
        location: "Unknown",
        profileImage: null,
        skills: [],
        experience: [],
        education: [],
        portfolioLinks: [],
        resume: null,
        lookingFor: "N/A",
        jobType: "N/A",
      });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const createOrUpdateProfile = async (req, res) => {
  const userId = req.user._id;
  console.log("Incoming payload:", req.body);

  try {
    const {
      fullName,
      tagline,
      currentRole,
      employmentType,
      experienceLevel,
      preferredIndustry,
      linkedinUrl,
      bio,
      location,
      profileImage,
      skills,
      experience,
      education,
      portfolioLinks,
      resume,
      lookingFor,
      jobType,
    } = req.body;

    // ✅ Always search by user
    let profile = await JobseekerProfile.findOne({ user: userId });

    if (profile) {
      // ✅ Update existing
      profile = await JobseekerProfile.findOneAndUpdate(
        { user: userId },
        {
          fullName,
          tagline,
          currentRole,
          employmentType,
          experienceLevel,
          preferredIndustry,
          linkedinUrl,
          bio,
          location,
          profileImage,
          skills,
          experience,
          education,
          portfolioLinks,
          resume,
          lookingFor,
          jobType,
        },
        { new: true }
      );
      return res.json({ success: true, message: "Profile updated", profile });
    }

    // ✅ Create new with user field
    profile = new JobseekerProfile({
      user: userId,
      fullName,
      tagline,
      currentRole,
      employmentType,
      experienceLevel,
      preferredIndustry,
      linkedinUrl,
      bio,
      location,
      profileImage,
      skills,
      experience,
      education,
      portfolioLinks,
      resume,
      lookingFor,
      jobType,
    });

    await profile.save();

    // ✅ Update User.hasProfile
    await User.findByIdAndUpdate(userId, { hasProfile: true });

    res.json({ success: true, message: "Profile created", profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
