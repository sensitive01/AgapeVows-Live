const dbConnect = require("./config/database/dbConnect");
const dotenv = require("dotenv");
dotenv.config();

dbConnect();

setTimeout(async () => {
  console.log("Connected to DB, clearing profileViews...");
  const userModel = require("./model/user/userModel");
  await userModel.updateMany({}, { $set: { profileViews: [] } });
  console.log("Cleared all profileViews! Testing will now work perfectly.");
  process.exit(0);
}, 3000);
