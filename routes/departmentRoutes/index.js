import express from "express";
import Department from "../../db/models/departmentSchema.js";
import chekToken from "../../middlewares/chekToken.js";
import Doctor from "../../db/models/doctorSchema.js";

const router = express.Router();
// add department
router.post("/",chekToken(['DOCTOR']), async (req, res) => {
  const body = { ...req.body };
  await Department.create(body); 
 return res.status(201).json({ mssage: "Department added successfully" });
});
// list all departments
router.get("/",chekToken(['DOCTOR','USER']), async (req, res) => {
  const departments = await Department.find();
 return res.status(200).json(departments);
});
// list doctors by department(department :id given below )
router.get('/doctor/:id',chekToken(['USER']), async (req, res) => {
  const {id}=req.params;
  const doctors = await Doctor.find({departemt:id});
 return res.status(200).json(doctors);
})
export default router;