import express, { Router } from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController";
const router = express.Router();

router.route("/").get(registerUser);
router.route("/login").post(authUser);
