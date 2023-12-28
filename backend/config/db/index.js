const mongoose = require("mongoose");
const { MONGODB_URI } = require("..");

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
