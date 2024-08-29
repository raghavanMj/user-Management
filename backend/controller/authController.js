const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const register = async (req, res) => {
  const { firstName, lastName, email, phone, role, password } = req.body;
  if (!firstName || !lastName || !phone || !email || !password) {
    throw new Error("Please provide All required fields");
  }
  const userExists = await userModel.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    throw new Error("User already exists..!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({
    email,
    firstName,
    lastName,
    phone,
    role,
    password: hashedPassword,
  });
  //console.log(req.body);
  const Token = JWT.sign(
    { id: newUser._id },
    process.env.JWT_TOKEN_KEY || "srgfxbcnvhmgho876534hgfnvdrDHGFVBNM9876",
    {
      expiresIn: "30d",
    }
  );
  res.json({
    message: "Register Success",
    Token,
    id: newUser._id,
    email: newUser.email,
    name: `${newUser.firstName} ${newUser.lastName}`,
  });
  newUser;
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userFind = await userModel.findOne({
    $or: [{ phone: username }, { email: username }],
  });
  if (!userFind) {
    throw new Error("Invalid Email or Password....!");
  }
  const isMatch = await bcrypt.compare(password, userFind.password);
  if (!isMatch) {
    throw new Error("Invalid Email or Password.....!");
  }
  const Token = JWT.sign(
    { id: userFind._id },
    process.env.JWT_TOKEN_KEY || "srgfxbcnvhmgho876534hgfnvdrDHGFVBNM9876",
    {
      expiresIn: "30d",
    }
  );
  res.json({
    message: "Login Success",
    Token,
    id: userFind._id,
    email: userFind.email,
    name: `${userFind.firstName} ${userFind.lastName}`,
  });
};

module.exports = { register, login };
