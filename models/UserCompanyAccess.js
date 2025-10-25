// models/UserCompanyAccess.js
import mongoose from 'mongoose';

const UserCompanyAccessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserCompanyAccess = mongoose.models.UserCompanyAccess || mongoose.model('UserCompanyAccess', UserCompanyAccessSchema);

export default UserCompanyAccess;
