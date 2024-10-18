require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors"); // Import the CORS package
const { connection } = require("./Configs/db");
const {UserRouter} = require("./routes/user.route.js");

// Create an instance of express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Apply CORS middleware with proper configuration
app.use(
  cors({
    origin: "*", // This allows requests from any origin. Use specific origins for security.
  })
);

app.use("/users", UserRouter);

// Get the PORT from .env or use 3000 by default
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, async () => {
  try {
    await connection; // Ensure that the DB connection is established
    console.log("Connected to DB");
  } catch (error) {
    console.log("Not Connected to DB", error.message);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
