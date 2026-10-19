import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    // Only seed if less than 2 users exist
    const count = await User.countDocuments();
    if (count >= 4) {
      console.log(`Database already has ${count} users. Skipping seed.`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    const demoUsers = [
      {
        name: "TechVision Labs",
        email: "recruiter@techvision.io",
        password: hashedPassword,
        userType: "employer",
        title: "Senior Frontend Developer",
        company: "TechVision Labs",
        bio: "Fast-growing SaaS startup building the future of collaborative workspaces. Great culture, competitive pay, and flexible hours.",
        skills: ["React", "TypeScript", "TailwindCSS", "Next.js"],
        salary: "₹25,000 - ₹45,000 / mo",
        experience: "2-4 years",
        teamSize: "Team of 15",
        benefits: "Remote Work, Health Insurance, Learning Stipend",
        location: "Pune (Remote)",
      },
      {
        name: "CloudNova AI",
        email: "careers@cloudnova.ai",
        password: hashedPassword,
        userType: "employer",
        title: "AI / ML Engineer",
        company: "CloudNova AI",
        bio: "Leading enterprise AI workflows with cutting-edge LLMs and agentic infrastructure. Join us to build next-gen AI systems.",
        skills: ["Python", "PyTorch", "LangChain", "FastAPI"],
        salary: "₹40,000 - ₹75,000 / mo",
        experience: "3+ years",
        teamSize: "Team of 25",
        benefits: "Stock Options, Flexible Hours, Annual Retreats",
        location: "Bengaluru (Hybrid)",
      },
      {
        name: "FinPulse Solutions",
        email: "hr@finpulse.com",
        password: hashedPassword,
        userType: "employer",
        title: "Full Stack Engineer",
        company: "FinPulse Solutions",
        bio: "Modern fintech infrastructure processing millions of transactions daily with high reliability and low latency.",
        skills: ["Node.js", "Express", "MongoDB", "React"],
        salary: "₹30,000 - ₹55,000 / mo",
        experience: "2-5 years",
        teamSize: "Team of 40",
        benefits: "Performance Bonuses, Comprehensive Health Cover",
        location: "Mumbai (On-site)",
      },
      {
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        password: hashedPassword,
        userType: "jobseeker",
        title: "Senior Frontend Engineer",
        company: "Ex-Stripe",
        bio: "Frontend engineer passionate about micro-interactions, clean design systems, and responsive web performance.",
        skills: ["React", "TypeScript", "CSS", "Next.js", "GraphQL"],
        salary: "Open for discussion",
        experience: "4 years",
        teamSize: "Available immediately",
        benefits: "Portfolio: alexmorgan.dev",
        location: "Pune / Remote",
      },
      {
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        password: hashedPassword,
        userType: "jobseeker",
        title: "Machine Learning Researcher",
        company: "Ex-DeepMind Fellow",
        bio: "Building multimodal agents, LLM evaluation pipelines, and fine-tuning open source models. Looking for high-paced AI teams.",
        skills: ["Python", "PyTorch", "Transformers", "LLMs", "FastAPI"],
        salary: "Competitive",
        experience: "3 years",
        teamSize: "2 weeks notice",
        benefits: "GitHub: github.com/sarahchen-ai",
        location: "Bengaluru / Remote",
      },
      {
        name: "Rohan Gupta",
        email: "rohan.gupta@example.com",
        password: hashedPassword,
        userType: "jobseeker",
        title: "Full Stack Developer",
        company: "Independent Contributor",
        bio: "Enthusiastic MERN stack developer with strong API design and real-time WebSocket architecture experience.",
        skills: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
        salary: "₹30k+",
        experience: "2 years",
        teamSize: "Available immediately",
        benefits: "Full-time / Contract",
        location: "Mumbai / Remote",
      },
    ];

    for (const u of demoUsers) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(`Created user: ${u.name} (${u.userType})`);
      }
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
