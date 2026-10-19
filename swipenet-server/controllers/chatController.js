import Message from "../models/Message.js";
import Match from "../models/Match.js";

// ✅ Send a message between matched users
export const sendMessage = async (req, res) => {
  const { matchId, content } = req.body;
  const senderId = req.user._id;

  try {
    if (!matchId || !content) {
      return res.status(400).json({ message: "matchId and content are required" });
    }

    const match = await Match.findById(matchId);

    if (!match || !match.users.some((id) => id.toString() === senderId.toString())) {
      return res.status(403).json({ message: "You are not part of this match." });
    }

    const newMessage = await Message.create({
      matchId,
      sender: senderId,
      content,
    });

    // Update match state from 'matched' to 'chatting' and mark firstMessageAt (stopping 48h countdown)
    if (!match.firstMessageAt) {
      match.firstMessageAt = new Date();
      match.firstMessageBy = senderId;
      match.stage = "chatting";
      await match.save();
    }

    const populatedMessage = await newMessage.populate("sender", "name email profilePic userType");

    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};

// ✅ Get all messages in a match (chat history)
export const getMessages = async (req, res) => {
  const matchId = req.params.matchId;
  const userId = req.user._id;

  try {
    const match = await Match.findById(matchId);

    if (!match || !match.users.some((id) => id.toString() === userId.toString())) {
      return res.status(403).json({ message: "Access denied to this chat." });
    }

    const messages = await Message.find({ matchId })
      .populate("sender", "name email profilePic userType")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};
