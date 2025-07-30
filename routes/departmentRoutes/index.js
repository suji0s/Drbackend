import express from "express";
import Department from "../../db/models/departmentSchema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const body = { ...req.body };
  await Department.create(body); 
 return res.status(201).json({ mssage: "Department added successfully" });
});
router.get("/", async (req, res) => {
  const departments = await Department.find();
 return res.status(200).json(departments);
});

export default router;