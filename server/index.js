import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './db.js';
import { User, University, Scholarship, Application, RegistrationRequest, AuditLog } from './models.js';
import {
  initialUniversities,
  initialScholarships,
  initialRegistrationRequests,
  initialApplications,
  initialAuditLogs
} from '../src/data/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Seed Database if empty
const seedDatabaseIfEmpty = async () => {
  try {
    const uniCount = await University.countDocuments();
    if (uniCount === 0) {
      console.log('[Seed] Seeding MongoDB Atlas with initial universities and scholarships...');
      await University.insertMany(initialUniversities);
      await Scholarship.insertMany(initialScholarships);
      await RegistrationRequest.insertMany(initialRegistrationRequests);
      await Application.insertMany(initialApplications);
      await AuditLog.insertMany(initialAuditLogs);

      // Default Seeded Users with default password '123456'
      await User.insertMany([
        { name: 'Alex Rivera', email: 'alex.rivera@student.edu', password: '123456', role: 'student' },
        { name: 'Prof. Eleanor Vance', email: 'eleanor.vance@ox.ac.uk', password: '123456', role: 'uniAdmin' },
        { name: 'Dr. Robert Sterling', email: 'rsterling@mit.edu', password: '123456', role: 'uniAdmin' },
        { name: 'Super Admin System', email: 'admin@platform.gov', password: '123456', role: 'superAdmin' }
      ]);

      console.log('[Seed] MongoDB Atlas successfully populated with seed records!');
    }
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
};

// Connect to MongoDB Atlas
connectDatabase().then(() => {
  seedDatabaseIfEmpty();
});

// API Routes

// 1. User Registration Endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if account already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists. Please log in instead.' });
    }

    // Create new registered account in MongoDB Atlas
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: password.trim(),
      role: role || 'student',
      status: 'Active'
    });

    await AuditLog.create({
      user: newUser.name,
      action: 'USER_REGISTER',
      details: `New account registered in MongoDB Atlas as ${newUser.role.toUpperCase()}`
    });

    res.status(201).json({
      message: 'Account successfully registered!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Strict User Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find registered account in MongoDB Atlas
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ error: 'Account not found. Please sign up for an account first.' });
    }

    // Validate Password match
    if (user.password !== password.trim()) {
      return res.status(401).json({ error: 'Incorrect password. Please verify your password and try again.' });
    }

    // Check account status
    if (user.status === 'Suspended') {
      return res.status(403).json({ error: 'This account has been suspended by an administrator.' });
    }

    // Log login to Audit Stream
    await AuditLog.create({
      user: user.name,
      action: 'USER_LOGIN',
      details: `Authenticated user logged in via MongoDB Atlas as ${user.role.toUpperCase()}`
    });

    res.json({
      message: 'Authentication successful',
      token: `jwt-atlas-${user._id}-${Date.now()}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Fetch Registered Users (Super Admin)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Fetch Universities
app.get('/api/universities', async (req, res) => {
  try {
    const unis = await University.find();
    res.json(unis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Fetch Scholarships
app.get('/api/scholarships', async (req, res) => {
  try {
    const schs = await Scholarship.find();
    res.json(schs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Submit Student Application
app.post('/api/applications', async (req, res) => {
  try {
    const newApp = await Application.create(req.body);
    await AuditLog.create({
      user: req.body.studentName || 'Student',
      action: 'APPLICATION_SUBMIT',
      details: `Application submitted for ${req.body.universityName}`
    });
    res.json(newApp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Connected to MongoDB Atlas',
    database: 'cluster0.k2yn5ax.mongodb.net/scholarships_platform',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[API Server] Running live with MongoDB Atlas on http://localhost:${PORT}`);
});
