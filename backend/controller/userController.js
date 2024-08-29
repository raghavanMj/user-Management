const userModel = require("../Models/userModel");
const createData = async (req, res) => {
  try {
    const userData = new userModel(req.body);

    if (!userData) {
      return res.status(404).json({ message: "User data Not Found" });
    }
    const newUser = await userData.save();

    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllData = async (req, res) => {
  try {
    const userData = await userModel.find();

    if (!userData) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserById = await userModel.findById(id);

    if (!UserById) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(UserById);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserById = await userModel.findById(id);

    if (!UserById) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ Message: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserById = await userModel.findById(id);

    if (!UserById) {
      return res.status(404).json({ message: "User Not Found" });
    }

    await crudModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createData,
  getAllData,
  getOneUser,
  updateUser,
  deleteUser,
};
