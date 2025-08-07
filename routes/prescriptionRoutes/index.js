import express from "express";
import Prescription from "../../db/models/prescriptionSchema.js";
import Pharmacy from "../../db/models/pharmacySchema.js";
import chekToken from "../../middlewares/chekToken.js";
import Appoinment from "../../db/models/appoinmentSchema.js";

const router = express.Router();
// add prscription by doctor
router.post("/doctor", chekToken(["DOCTOR"]), async (req, res) => {
  const body = { ...req.body };
  const prescripton = await Prescription.create(body);
  res.status(201).json({ message: "prescription added" });
});
// list prescription by appoinment id

router.get(
  "/appoinment/:id",
  chekToken(["DOCTOR", "USER"]),
  async (req, res) => {
    const { id } = req.params;
    const prescription = await Prescription.find({ appoinment: id });
    res.status(201).json(prescription);
  }
);
// list medicine using prescription
router.get(
  "pharmacy/appoinment/:id",
  chekToken(["DOCTOR", "USER"]),
  async (req, res) => {
    const { id } = req.params;
    const prescription = await Prescription.findOne({ appoinment: id });
    const medicines = await Pharmacy.find({
      _id: { $in: prescription.medication },
    });
    res.status(201).json(medicines);
  }
);
export default router;
