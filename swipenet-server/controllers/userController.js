import User from "../models/User.js";

// ✅ Get all users available for swiping (opposite userType, not yet swiped)
export const getAllUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const swipedRight = currentUser.swipedRight || [];
    const swipedLeft = currentUser.swipedLeft || [];
    const excludedUserIds = [currentUser._id, ...swipedRight, ...swipedLeft];

    // If employer, show job seekers; if jobseeker, show employers
    const targetType =
      currentUser.userType === "employer" ? "jobseeker" : "employer";

    let users = await User.find({
      _id: { $nin: excludedUserIds },
      userType: targetType,
    }).select("-password");

    // If no users of opposite type, return any unswiped users as fallback so the user always has cards
    if (users.length === 0) {
      users = await User.find({
        _id: { $nin: excludedUserIds },
      }).select("-password");
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
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
    const userId = req.user._id;
    const {
      name,
      bio,
      skills,
      interests,
      title,
      company,
      salary,
      experience,
      teamSize,
      benefits,
      location,
      profilePic,
    } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (title !== undefined) updateData.title = title;
    if (company !== undefined) updateData.company = company;
    if (salary !== undefined) updateData.salary = salary;
    if (experience !== undefined) updateData.experience = experience;
    if (teamSize !== undefined) updateData.teamSize = teamSize;
    if (benefits !== undefined) updateData.benefits = benefits;
    if (location !== undefined) updateData.location = location;
    if (profilePic !== undefined) updateData.profilePic = profilePic;

    if (skills !== undefined) {
      updateData.skills = Array.isArray(skills)
        ? skills
        : skills
        ? skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    }
    if (interests !== undefined) {
      updateData.interests = Array.isArray(interests)
        ? interests
        : interests
        ? interests.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};
