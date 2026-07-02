require('dotenv').config();
const mongoose = require('mongoose');
const userModel = require('./model/user/userModel');
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE_NAME } = require('./config/variables/variables');

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.69vdrs0.mongodb.net/${MONGO_DATABASE_NAME}`;

mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 }).then(async () => {
  try {
    const all = await userModel.countDocuments();
    const nonDeleted = await userModel.countDocuments({ $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] });
    const approved = await userModel.countDocuments({ isApproved: true });
    
    // Check if there are other flags like role
    const adminRole = await userModel.countDocuments({ role: 'admin' });
    
    console.log('Total:', all, 'Non-Deleted:', nonDeleted, 'Approved:', approved, 'Admin:', adminRole);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}).catch(console.error);
