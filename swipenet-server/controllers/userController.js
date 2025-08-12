import User from "../models/User.js";

// ✅ Get all users except the current user (optional: exclude already swiped users)
export const getAllUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const excludedUserIds = [
      req.user._id,
      ...currentUser.rightSwipes,
      ...currentUser.leftSwipes,
    ];

    const users = await User.find({
      _id: { $nin: excludedUserIds },
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// ✅ Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

// ✅ Update profile
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};
