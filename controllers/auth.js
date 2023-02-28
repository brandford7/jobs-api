const StatusCodes = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(201).json({ msg: "created", user: user.name, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ msg: "success", user: user.name, token });
};

module.exports = { register, login };
