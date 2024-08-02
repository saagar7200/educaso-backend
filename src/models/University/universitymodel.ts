import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    universityPhoto: {
      type: String,
      required: true,
    },

    flagPhoto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UniversityModel = mongoose.model("University", universitySchema);

export default UniversityModel
