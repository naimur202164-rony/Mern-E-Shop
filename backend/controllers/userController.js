import asyncHander from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHander(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
});
