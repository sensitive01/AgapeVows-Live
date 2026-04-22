// // ---------------- migration.js ----------------
// const mongoose = require("mongoose");
// const userModel = require("../model/user/userModel"); // Adjust path
// const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE_NAME } = require("../config/variables/variables");
// require("dotenv").config();

// // ---------------- MongoDB Connection ----------------
// const MONGO_URI = `mongodb+srv://matrimony:wwNzesVp35r1bPRY@cluster0.69vdrs0.mongodb.net/matrimony?retryWrites=true&w=majority`;
// console.log("MONGO_URI", MONGO_URI); // ✅ Log the URI for debugging (remove in productionC)
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true }) // removed deprecated useUnifiedTopology
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1); // stop execution if DB connection fails
//   });

// // ---------------- Helper Function to Generate Unique AGV ID ----------------
// const generateAgvId = async () => {
//   let id;
//   let exists = true;
//   while (exists) {
//     const randomNumber = Math.floor(100000 + Math.random() * 900000);
//     id = `AGV${randomNumber}`;
//     exists = await userModel.exists({ agvid: id });
//   }
//   return id;
// };

// // ---------------- Migration Function ----------------
// const migrateUsers = async () => {
//   try {
//     const users = await userModel.find({ agwid: { $exists: true } });
//     console.log(`Found ${users.length} users with agwid`);

//     for (let user of users) {
//       try {
//         const newAgvId = await generateAgvId();
//         user.agwid = newAgvId;
//         delete user.agwid; // Remove old field
//         await user.save();
//         console.log(`✅ Updated user ${user._id} → ${newAgvId}`);
//       } catch (userErr) {
//         console.error(`⚠️ Failed to update user ${user._id}:`, userErr.message);
//       }
//     }

//     console.log("🎉 Migration completed successfully!");
//   } catch (err) {
//     console.error("❌ Migration error:", err.message);
//   } finally {
//     mongoose.disconnect();
//     console.log("MongoDB connection closed.");
//   }
// };

// // ---------------- Run Migration ----------------
// migrateUsers();