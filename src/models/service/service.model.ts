import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    breadPhoto: { type: String, required: true }, // Assuming it's a URL or path to the photo
    photo1: { type: String, required: true }, // Assuming it's a URL or path to the photo
    photo2: { type: String , default: "",required:false }, // Optional photo field
    description: { type: String, required: true },
    info: { type: [String], required: true }, // Array of strings
    conclusion: { type: String, required: true },
  });
  
  const ServiceModel = mongoose.model("Service", serviceSchema);
  
  export default ServiceModel;