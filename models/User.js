const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
  const user = this;

  // Log whether the password is being modified
  console.log('User Model: Password is being modified:', user.isModified('password'));

  if (!user.isModified('password')) return next(); // Only hash if the password is new or modified

  try {
    const salt = await bcrypt.genSalt(10);
    console.log('User Model: Generated Salt:', salt);
    
    user.password = await bcrypt.hash(user.password, salt);
    console.log('User Model: Hashed Password:', user.password);
    
    next();
  } catch (error) {
    console.error('User Model: Error during password hashing:', error);
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema);
