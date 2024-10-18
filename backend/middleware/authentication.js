const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Import your User model

// Middleware to check if the user is valid
const checkUserValidity = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get the token from the request headers

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by the ID from the token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach the user to the request object for further use
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = checkUserValidity;
