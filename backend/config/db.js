const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://raghavanicore:kQqVmicL4DC9xgrA@cluster0.ya7nc.mongodb.net",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
