import express from "express";
// import Doctor from "../../db/models/doctorSchema.js";
// import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup",async (req, res) => {


 return res.status(201).json({ mssage: "signup successfull" });
});

router.post("/login", (req, res) => {
return  res.status(201).json({ mssage: "login successfull" });
});

export default router;
