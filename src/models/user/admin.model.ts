import { Role } from "../../constants/global";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    fullName: { type: String, required: true },
    currentCity: { type: String, default: "" },
    phoneNumber: { type: String, required: true },
   
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
    confirmEmailToken: { type: String, default: null },
  });

  // Create the admin model
  export const AdminModel = mongoose.model("Admin", adminSchema);