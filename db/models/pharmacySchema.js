import { Schema, model } from "mongoose";

const pharmacySchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
     
    },
    price: {
      type: Number,
      required: true,
    },
     quantity: {
      type: Number,
      required: true,
    },
    image:{
        type:String,
        required:true,
    },
    expiryDate:{
        type:Date,
         required:true,
    }
  },
  { timestamps: true }
);
const Pharmacy= model("Pharmacy", pharmacySchema);