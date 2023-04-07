import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body; //getting username and password from the req made by user

  const user = await UserModel.findOne({ username }); //checking if the user already exists will return true to false

  if (user) {
    return res.json({ message: "Username already in use" });
  }

  const hashedPass = await bcrypt.hash(password, 10); //hashing password for safety

  const newUser = new UserModel({ username, password: hashedPass }); //creating a new user after check has been made

  await newUser.save(); //saving user to database

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username }); //checking if user exists

  if (!user) {
    //if user does not exist
    return res.json({ message: "User does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); //hashing will return the same result for the same password

  if (!isPasswordValid) {
    //checking if password is correct
    return res.json({ message: "Username or Password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret"); //verification and authentication
  res.json({ token, userID: user._id });
});

export { router as userRouter };
