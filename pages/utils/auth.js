// utils/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error("No token provided");
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId; // Return the decoded userId
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
