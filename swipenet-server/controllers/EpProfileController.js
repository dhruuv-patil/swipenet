import EmployerProfile from "../models/EmployerProfile.js";

// Create or Update Employer Profile
export const createOrUpdateEmployerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profileData = req.body;

    let profile = await EmployerProfile.findOne({ user: userId });

    if (profile) {
      profile = await EmployerProfile.findOneAndUpdate(
        { user: userId },
        { $set: profileData },
        { new: true }
      );
      return res.json({ success: true, message: "Profile updated", profile });
    }

    profile = new EmployerProfile({ user: userId, ...profileData });
    await profile.save();
    res.json({ success: true, message: "Profile created", profile });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Employer Profile
export const getEmployerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await EmployerProfile.findOne({ user: userId }).populate("user", "name email");
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
