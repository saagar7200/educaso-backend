import mongoose, { model } from "mongoose";

const studyAbroadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    breadPhoto: { type: String, required: true },
    description1: { type: String, required: true },
    description2: { type: String, required: true },
    educasoImage: { type: String, required: true },
    educationImage: { type: String, required: true },
    educationList: { type: [String], required: true },
    educationDialog: { type: String, required: true },
    isInEurope: {
      type: Boolean,
      default: false,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const StudyAbroadModel = model("studyabroad", studyAbroadSchema);

export default StudyAbroadModel;
