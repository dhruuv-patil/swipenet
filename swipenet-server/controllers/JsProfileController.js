import JobseekerProfile from "../models/JobseekerProfile.js";

// Create or Update Jobseeker Profile
export const createOrUpdateJobseekerProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from JWT middleware
    const profileData = req.body;

    // Check if profile already exists
    let profile = await JobseekerProfile.findOne({ user: userId });

    if (profile) {
      // Update
      profile = await JobseekerProfile.findOneAndUpdate(
        { user: userId },
        { $set: profileData },
        { new: true }
      );
      return res.json({ success: true, message: "Profile updated", profile });
    }

    // Create new profile
    profile = new JobseekerProfile({ user: userId, ...profileData });
    await profile.save();
    res.json({ success: true, message: "Profile created", profile });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Jobseeker Profile
export const getJobseekerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await JobseekerProfile.findOne({ user: userId }).populate("user", "name email");
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
