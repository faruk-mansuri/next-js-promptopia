import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: [true, 'Email already exists'],
  },
  avatar: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifiedToken: String,
  verifiedTokenExpiry: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
