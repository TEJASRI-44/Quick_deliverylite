const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Accepts only 10-digit numbers
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },

  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password is required only if not using Google OAuth
    },
  },

  role: {
    type: String,
    enum: ['customer', 'driver', 'admin'],
    required: true,
    default: 'customer',
  },

  googleId: {
    type: String,
    default: null,
  },
}, { timestamps: true });

// Hash password only if modified or new
userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
