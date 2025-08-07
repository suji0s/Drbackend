import express from"express";
import Appoinment from "../../db/models/appoinmentSchema.js";
import chekToken from "../../middlewares/chekToken.js";
import Slot from "../../db/models/slotSchema.js";
const router = express.Router();

// list appoinment by doctor

router.get("/doctor/:id", chekToken("DOCTOR"), async(req, res) => {
  const { id } = req.params;
  const appoinments = await Appoinment.find({ doctor: id });
  res.status(200).json(appoinments);
});

// list appoinment by  user id
router.get("/user/:id", chekToken("USER"),async (req, res) => {
  const { id } = req.params;
  const appoinments =await Appoinment.find({ user: id });
  res.status(200).json(appoinments);
});
// take apponments

router.post("/", async (req, res) => {
  const body = { ...req.body };
  const slotId = body.slot;
  const appoinment = await Appoinment.create(body);
  const slot = await Slot.findByIdAndUpdate(slotId, { availability: false });
  res.stauts(200).json({ message: "Appointment Booked" });
});

export default router;
