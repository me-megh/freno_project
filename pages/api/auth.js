import bcrypt from 'bcryptjs';
import connectDB from '../../lib/db';
import User from '../../models/User';

// Initialize MongoDB connection
connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, username } = req.body;

    // Validate that email, password, and username are provided
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Email, password, and username are required" });
    }

    // Check if the user already exists based on the email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object
      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ message: "User Created" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
}
