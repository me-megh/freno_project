// models/Company.js
import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Add any other fields you need
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.models.Company || mongoose.model('Company', CompanySchema, 'companies');

export default Company;
