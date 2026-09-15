import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '123456' },
  role: { type: String, enum: ['student', 'uniAdmin', 'superAdmin'], default: 'student' },
  status: { type: String, default: 'Active' },
  gpa: { type: String, default: '3.8' },
  createdAt: { type: Date, default: Date.now }
});

// University Schema
const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  coverImage: String,
  country: String,
  city: String,
  website: String,
  establishedYear: Number,
  type: String,
  description: String,
  history: String,
  campusInfo: String,
  intStudentInfo: String,
  rating: { type: Number, default: 4.5 },
  tuitionRange: String,
  status: { type: String, default: 'Approved' },
  adminEmail: String
});

// Scholarship Schema
const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: String,
  universityName: String,
  amount: String,
  fundingType: String,
  eligibility: String,
  deadline: String,
  degreeLevels: [String],
  field: String,
  country: String,
  requirements: String,
  status: { type: String, default: 'Approved' }
});

// Application Schema
const applicationSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  universityName: String,
  programName: String,
  scholarshipName: String,
  status: { type: String, default: 'Pending' },
  appliedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  documents: Array,
  notes: String
});

// University Registration Request Schema
const registrationRequestSchema = new mongoose.Schema({
  universityName: String,
  logo: String,
  country: String,
  city: String,
  website: String,
  establishedYear: Number,
  type: String,
  contactPerson: String,
  contactEmail: String,
  submissionDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Pending' },
  rejectionReason: String,
  wizardData: Object
});

// Audit Log Schema
const auditLogSchema = new mongoose.Schema({
  user: String,
  action: String,
  details: String,
  timestamp: { type: String, default: () => new Date().toISOString().replace('T', ' ').substring(0, 19) }
});

export const User = mongoose.model('User', userSchema);
export const University = mongoose.model('University', universitySchema);
export const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export const Application = mongoose.model('Application', applicationSchema);
export const RegistrationRequest = mongoose.model('RegistrationRequest', registrationRequestSchema);
export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
