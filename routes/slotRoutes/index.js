import express from "express";
import Slot from "../../db/models/slotSchema.js";
import chekToken from "../../middlewares/chekToken.js";
const router = express.Router();

// add slot by doctor--doctor route
router.post("/",chekToken(['DOCTOR']), async (req, res) => {
  const body = [...req.body];
  await Slot.insertMany(body);
  res.status(201).json({ mssage: "slot added" });
});

// list slot of doctor --userRoute

router.get("/doctor/:id",chekToken(['DOCTOR','USER']), async (req, res) => {
  const { id } = req.params;
  const slots = await Slot.find({ doctor: id });
  res.status(200).json(slots);
});

export default router;
