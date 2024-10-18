const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Import the User model
const { body, validationResult } = require("express-validator"); // Import express-validator for validation
const checkUserValidity = require("../middleware/authentication");

const UserRouter = express.Router();

// Register route
UserRouter.post(
  "/register",
  [
    body("firstname").notEmpty().withMessage("First name is required"),
    body("lastname").notEmpty().withMessage("Last name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, username, email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({
        $or: [{ username }, { email }]
      });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      user = new User({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword, // Save the hashed password
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error registering user",
        error: error.message,
      });
    }
  }
);

// Login route
UserRouter.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      console.log(user);
      // Check if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(200).json({ message: "Invalid password" });
      }

      // Generate a JWT token for authentication
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expiry time
      });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }
);

UserRouter.get("/getUser", checkUserValidity, async (req, res) => {
  try {
    // Since the user has already been attached to req in the middleware
    const user = req.user;

    // Optionally, you can create a response object to exclude sensitive data
    const userDetails = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      // Add any other fields you want to send
    };

    return res.status(200).send(userDetails); // Send user details as a response
  } catch (error) {
    return res.status(500).send({ message: "Error fetching user details", error: error.message });
  }
});

module.exports = { UserRouter };
