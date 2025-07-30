import { Schema, model } from "mongoose";
import Appoinment from "./appoinmentSchema";

const prescriptionSchema= Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
    appoinment: {
    type: Schema.Types.ObjectId,
    ref: "Appoinment",
  },
  message:{
    type:String
  },
medication:{
    type:[{type: Schema.Types.ObjectId,
    ref: "Pharmacy",}]
}

});

const Prescription=model("Prescription",prescriptionSchema);
export default Prescription;