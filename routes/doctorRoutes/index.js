import express from "express";
import Doctor from "../../db/models/doctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };

  const doctor = await Doctor.findOne({ username: body.username });

  if (doctor) {
    res.status(403).json({ message: "user name alraedy taken" });
  }
  if (body.password !== body.confirmPassword) {
    return res.status(403).json({ message: "password dont match" });
  }

  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;

  await Doctor.create(body);

  return res.status(201).json({ mssage: "signup successfull" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  console.log(body.username);
  const doctor = await Doctor.findOne({ username: body.username });
  if (!doctor) {
    console.log("user not found");
    return res.status(403).json({ message: "username or password incorrect" });
  }

  const isMatching = await bcrypt.compare(body.password, doctor.password);
  if (!isMatching) {
    console.log("password does not match");
    return res.status(403).json({ message: "username or password incorrect" });
  }

  const token = jwt.sign(
    { role: "DOCTOR", id: doctor._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "8d",
    }
  );

  return res.status(201).json({ message: "login successfull", token: token });
});
//  get doc by id
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  // const doctor = await Doctor.findById(id).populate('department');

  const doctor = await Doctor.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        localField: "department",
        from: "departments",
        foreignField: "_id",
        as: "departmentDetails",
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        image: 1,
        specialization: 1,
        departmentDetails: 1,
      },
    },
  ]);

  doctor.password = "";
  res.status(200).json(doctor);
});

export default router;
