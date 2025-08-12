import Match from "../models/Match.js";
import User from "../models/User.js";

// User A swipes right on User B
export const swipeRight = async (req, res) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.id;

  try {
    const currentUser = await User.findById(currentUserId);

    // Prevent duplicate swipes
    if (currentUser.rightSwipes.includes(targetUserId)) {
      return res.status(400).json({ message: "Already swiped right" });
    }

    // Save swipe
    currentUser.rightSwipes.push(targetUserId);
    await currentUser.save();

    // Check if targetUser already swiped right on currentUser
    const targetUser = await User.findById(targetUserId);

    if (targetUser.rightSwipes.includes(currentUserId.toString())) {
      // Create a match
      const newMatch = await Match.create({
        users: [currentUserId, targetUserId],
      });

      return res.status(201).json({ message: "It's a match!", match: newMatch });
    }

    res.status(200).json({ message: "Swiped right" });
  } catch (error) {
    res.status(500).json({ error: "Swipe failed", details: error.message });
  }
};

// ⏪ User A swipes left on User B
export const swipeLeft = async (req, res) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.id;

  try {
    const currentUser = await User.findById(currentUserId);

    if (currentUser.leftSwipes.includes(targetUserId)) {
      return res.status(400).json({ message: "Already swiped left" });
    }

    currentUser.leftSwipes.push(targetUserId);
    await currentUser.save();

    res.status(200).json({ message: "Swiped left" });
  } catch (error) {
    res.status(500).json({ error: "Swipe left failed", details: error.message });
  }
};

// ✅ Get all matches of logged-in user
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      users: { $in: [req.user._id] },
      isActive: true,
    }).populate("users", "-password"); // Get full user details

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};
