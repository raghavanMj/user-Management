const express = require("express");
const {
  createData,
  deleteUser,
  getAllData,
  getOneUser,
  updateUser,
} = require("../controller/userController.js");

const userRoute = express.Router();

userRoute.post("/create", createData);
userRoute.get("/getuser", getAllData);
userRoute.get("/getUserById/:id", getOneUser);
userRoute.put("/updateUser/:id", updateUser);
userRoute.delete("/deleteUser/:id", deleteUser);

module.exports = userRoute;
