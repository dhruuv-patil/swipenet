import Message from "../models/Message.js";
import Match from "../models/Match.js";
import User from "../models/User.js";

// ✅ Send a message between matched users
export const sendMessage = async (req, res) => {
  const { matchId, content } = req.body;
  const senderId = req.user._id;

  try {
    const match = await Match.findById(matchId);

    if (!match || !match.users.includes(senderId)) {
      return res.status(403).json({ message: "You are not part of this match." });
    }

    const newMessage = await Message.create({
      matchId,
      sender: senderId,
      content,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};

// ✅ Get all messages in a match (chat history)
export const getMessages = async (req, res) => {
  const matchId = req.params.matchId;
  const userId = req.user._id;

  try {
    const match = await Match.findById(matchId);

    if (!match || !match.users.includes(userId)) {
      return res.status(403).json({ message: "Access denied to this chat." });
    }

    const messages = await Message.find({ matchId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};
