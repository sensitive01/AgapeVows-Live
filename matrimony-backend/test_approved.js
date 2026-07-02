require('dotenv').config();
const mongoose = require('mongoose');
const userModel = require('./model/user/userModel');
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE_NAME } = require('./config/variables/variables');

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.69vdrs0.mongodb.net/${MONGO_DATABASE_NAME}`;

mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 }).then(async () => {
  try {
    const originalCount = await userModel.countDocuments({ isApproved: true, $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] });
    console.log('Original count (Approved + Non-deleted):', originalCount);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}).catch(console.error);
