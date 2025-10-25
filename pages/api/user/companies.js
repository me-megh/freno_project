import Company from '../../../models/Company';
import UserCompanyAccess from '../../../models/UserCompanyAccess';
import connectDB from '../../../lib/db';

export default async function handler(req, res) {
  // Ensure MongoDB is connected
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ message: 'Database connection failed', error: error.message });
  }

  // POST request: Create a new company and assign user access
  if (req.method === 'POST') {
    const { userId, companyName, companyDescription } = req.body;
    console.log(req.body, "-----------------");

    // Validation: Ensure all required fields are provided
    if (!userId || !companyName || !companyDescription) {
      return res.status(400).json({
        message: 'Missing required fields: userId, companyName, or companyDescription',
      });
    }

    try {
      // Step 1: Create the company document
      const company = new Company({
        name: companyName,
        description: companyDescription,
      });

      // Save the company to the database
      await company.save();
      console.log('Company created:', company);

      // Step 2: Create the user-company access document
      const userCompanyAccess = new UserCompanyAccess({
        userId,
        companyId: company._id,
      });

      // Save the user-company access to the database
      await userCompanyAccess.save();
      console.log('User-Company Access Created:', userCompanyAccess);

      // Respond with success message and the created documents
      return res.status(201).json({
        message: 'Company created and user access granted',
        company,
        userCompanyAccess,
      });
    } catch (error) {
      console.error('Error creating company or assigning access:', error);
      return res.status(500).json({
        message: 'Error creating company or assigning access',
        error: error.message,
      });
    }
  }

  // GET request: Fetch companies linked to the user
  else if (req.method === 'GET') {
    const { userId } = req.query; // Assuming the userId is sent as a query parameter

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      // Fetch companies linked to the user via UserCompanyAccess model
      const userCompanies = await UserCompanyAccess.find({ userId })
        .populate('companyId'); // Populating company details from the Company model

      if (!userCompanies || userCompanies.length === 0) {
        return res.status(404).json({ message: 'No companies found for this user' });
      }

      // Respond with the list of companies
      return res.status(200).json({ companies: userCompanies });
    } catch (error) {
      console.error('Error fetching companies:', error);
      return res.status(500).json({
        message: 'Error fetching companies',
        error: error.message,
      });
    }
  }

  // If neither GET nor POST, return Method Not Allowed
  else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
