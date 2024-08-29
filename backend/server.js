const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRouter.js");
const authRoutes = require("./routes/authRouter.js");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001", "*"],
  })
);

app.options("*", cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
