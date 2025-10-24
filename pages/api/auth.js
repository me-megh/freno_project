import bcrypt from 'bcryptjs';
import connectDB from '../../lib/db';
import User from '../../models/User';
import jwt from 'jsonwebtoken'; // Import jwt to create token
import mongoose from 'mongoose';

// Initialize MongoDB connection
if (mongoose.connection.readyState === 0) {
    console.log('Connecting to MongoDB...');
    connectDB();
  }  

export default async function handler(req, res) {
    console.log('Received request:', req.method, req.body);
  if (req.method === "POST") {
    const { email, password, username } = req.body;
    // Signup logic
    if (username) {
        console.log('Signup process started');
      
      // Validate that email, password, and username are provided for signup
      if (!email || !password || !username) {
        return res.status(400).json({ message: "Email, password, and username are required" });
      }

      try {
         // Check if the user already exists based on the email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
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

        return res.status(201).json({ message: "User Created" });
      } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
        console.log('Login process started');
      // Login logic
      if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: "Email and password are required" });
      }

      try {
        // Check if the user exists based on the email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid credentials: User not found');
          return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials: Password mismatch');
          return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET, // Make sure to have this in your .env file
          { expiresIn: '1h' } // Token expiry of 1 hour
        );

        // Send back the token and user info (you can modify this response as needed)
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
              id: user._id,
              email: user.email,
              username: user.username, // Add any other details you want to send
            }
          });

      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
}
