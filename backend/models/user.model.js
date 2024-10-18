const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed in production
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
