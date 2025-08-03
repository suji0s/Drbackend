import express from "express";
import bcrypt from "bcrypt";
import User from "../../db/models/userSchema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };

  const user = await User.findOne({ username: body.username });

  if (user) {
    res.status(403).json({ message: "user name alraedy taken" });
  }
  if (body.password !== body.confirmPassword) {
    return res.status(403).json({ message: "password dont match" });
  }

  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;
  await User.create(body);

  return res.status(201).json({ mssage: "signup successfull" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  console.log(body.username);
  const user = await User.findOne({ username: body.username });
  if (!user) {
    console.log("user not found");
    return res.status(403).json({ message: "username or password incorrect" });
  }

  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    console.log("password does not match");
    return res.status(403).json({ message: "username or password incorrect" });
  }


  const token = jwt.sign({ role: "USER", id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "8d",
  });

  return res.status(201).json({ message: "login successfull", token: token });
});

export default router;
