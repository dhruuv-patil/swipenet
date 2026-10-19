import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'swipenet_secret_key_123', {
    expiresIn: '7d',
  });
};

// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, userType, title, company, bio, skills, location } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedUserType =
      userType.toLowerCase().includes('employer') ? 'employer' : 'jobseeker';

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      userType: normalizedUserType,
      title: title || '',
      company: company || '',
      bio: bio || '',
      skills: Array.isArray(skills) ? skills : skills ? skills.split(',').map((s) => s.trim()) : [],
      location: location || '',
      swipedRight: [],
      swipedLeft: [],
      matches: [],
    });

    const userResponse = {
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      title: user.title,
      company: user.company,
      bio: user.bio,
      skills: user.skills,
      location: user.location,
    };

    res.status(201).json({
      message: 'Registered successfully',
      user: userResponse,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const userResponse = {
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      title: user.title,
      company: user.company,
      bio: user.bio,
      skills: user.skills,
      location: user.location,
    };

    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   GET /api/auth/profile
// @access  Private (token required)
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
