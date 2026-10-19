import Match from "../models/Match.js";
import User from "../models/User.js";
import Swipe from "../models/Swipe.js";

// Helper to generate context-rich icebreakers
const generateIcebreakers = (userA, userB) => {
  const skillsA = (userA.skills || []).map((s) => s.toLowerCase().trim());
  const commonSkills = (userB.skills || []).filter((s) =>
    skillsA.includes(s.toLowerCase().trim())
  );

  const list = [];
  if (commonSkills.length > 0) {
    list.push({
      prompt: `Hey! I noticed we both work with ${commonSkills.slice(0, 2).join(" & ")}. What projects are you shipping with it recently?`,
      reason: `Shared stack: ${commonSkills.join(", ")}`,
    });
  }

  const otherName = (userB.name || "there").split(" ")[0];
  list.push({
    prompt: `Hi ${otherName}! Impressed by your track record. Would you be open for a quick 15-min intro this week?`,
    reason: "Direct intro request",
  });

  list.push({
    prompt: `Hey! What are the most exciting technical challenges you're tackling right now?`,
    reason: "Engineering culture query",
  });

  return list;
};

// ⏩ User A swipes right on User B
export const swipeRight = async (req, res) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.id;

  try {
    if (currentUserId.toString() === targetUserId.toString()) {
      return res.status(400).json({ message: "You cannot swipe on yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    // Record in Swipe collection
    await Swipe.findOneAndUpdate(
      { fromUser: currentUserId, toUser: targetUserId },
      { direction: "right" },
      { upsert: true, new: true }
    );

    // Maintain backwards-compatible user arrays
    if (!currentUser.swipedRight) currentUser.swipedRight = [];
    if (!currentUser.matches) currentUser.matches = [];
    if (!targetUser.swipedRight) targetUser.swipedRight = [];
    if (!targetUser.matches) targetUser.matches = [];

    const alreadySwiped = currentUser.swipedRight.some(
      (id) => id.toString() === targetUserId.toString()
    );

    if (!alreadySwiped) {
      currentUser.swipedRight.push(targetUserId);
      await currentUser.save();
    }

    // Check if targetUser already swiped right on currentUser
    const isMutual = targetUser.swipedRight.some(
      (id) => id.toString() === currentUserId.toString()
    );

    if (isMutual) {
      const icebreakers = generateIcebreakers(currentUser, targetUser);

      // Check if match already exists
      let existingMatch = await Match.findOne({
        users: { $all: [currentUserId, targetUserId] },
        isActive: true,
      }).populate("users", "-password");

      if (!existingMatch) {
        existingMatch = await Match.create({
          users: [currentUserId, targetUserId],
          stage: "matched",
          expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48-hour countdown
          suggestedIcebreakers: icebreakers,
        });
        existingMatch = await existingMatch.populate("users", "-password");

        // Update matches in both user records
        if (!currentUser.matches.some((id) => id.toString() === targetUserId.toString())) {
          currentUser.matches.push(targetUserId);
          await currentUser.save();
        }
        if (!targetUser.matches.some((id) => id.toString() === currentUserId.toString())) {
          targetUser.matches.push(currentUserId);
          await targetUser.save();
        }
      }

      return res.status(200).json({
        message: "It's a match!",
        isMatch: true,
        match: existingMatch,
        icebreakers: existingMatch.suggestedIcebreakers || icebreakers,
        matchedUser: {
          _id: targetUser._id,
          name: targetUser.name,
          email: targetUser.email,
          userType: targetUser.userType,
          title: targetUser.title,
          company: targetUser.company,
          bio: targetUser.bio,
          skills: targetUser.skills,
          location: targetUser.location,
        },
      });
    }

    res.status(200).json({ message: "Swiped right", isMatch: false });
  } catch (error) {
    console.error("Swipe right error:", error);
    res.status(500).json({ error: "Swipe failed", details: error.message });
  }
};

// ⏪ User A swipes left on User B
export const swipeLeft = async (req, res) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.id;

  try {
    const currentUser = await User.findById(currentUserId);

    // Record in Swipe collection
    await Swipe.findOneAndUpdate(
      { fromUser: currentUserId, toUser: targetUserId },
      { direction: "left" },
      { upsert: true, new: true }
    );

    if (!currentUser.swipedLeft) currentUser.swipedLeft = [];

    const alreadySwiped = currentUser.swipedLeft.some(
      (id) => id.toString() === targetUserId.toString()
    );

    if (!alreadySwiped) {
      currentUser.swipedLeft.push(targetUserId);
      await currentUser.save();
    }

    res.status(200).json({ message: "Swiped left" });
  } catch (error) {
    console.error("Swipe left error:", error);
    res.status(500).json({ error: "Swipe left failed", details: error.message });
  }
};

// ✅ Get all matches of logged-in user
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      users: { $in: [req.user._id] },
      isActive: true,
    })
      .populate("users", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json(matches);
  } catch (error) {
    console.error("Get matches error:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};
