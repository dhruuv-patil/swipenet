import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { initMatchExpiryWorker } from "./workers/matchExpiryWorker.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "SwipeNet API is running 🚀" });
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/chats", chatRoutes);

// ✅ Create server and attach socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ Socket.io for real-time chat
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // Join a chat room (roomId = matchId)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`🔗 Socket ${socket.id} joined room ${roomId}`);
  });

  // Handle incoming message and emit to room
  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// ✅ Initialize Background Match Expiry Worker (48h rule)
initMatchExpiryWorker(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
