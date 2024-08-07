const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
  id: {
    type: String,
  },
  overview: {
    type: String,
    required: true,
  },
  breadPhoto: { type: String, required: true }, // Assuming it's a URL or path to the photo
  overviewPhoto1: { type: String, required: true }, // Assuming it's a URL or path to the photo
  overviewPhoto2: { type: String, default: "", required: true }, // Optional photo field
  registerPhoto1: { type: String, required: true }, // Assuming it's a URL or path to the photo
  registerPhoto2: { type: String, default: "", required: true }, // Optional photo field
  testFormat: [
    {
      testSection: { type: String, required: true },
      timeAllocation: { type: String, required: true },
      totalNoOfQuestions: { type: Number, required: true },
      itemTypes: { type: [String], required: true },
    },
  ],
  faq: [
    {
      ques: { type: String, required: false },
      ans: { type: [String], required: false },
    },
  ],
  register: {
    type: [String],
    required: true,
  },
});

export const TestPreparationModel = mongoose.model("testSchema", testSchema);
