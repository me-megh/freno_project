// pages/api/company/[companyId].js

import mongoose from "mongoose";
import Company from "../../../models/Company"; // Assuming Company model

// MongoDB connection utility
async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return; // If already connected, don't reconnect
  }
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

export default async function handler(req, res) {
  const { companyId } = req.query;  // Get companyId from URL params

  try {
    await connectDB();  // Ensure MongoDB connection

    // Fetch company by ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Return company data
    res.status(200).json({ company });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Error fetching company details" });
  }
}
