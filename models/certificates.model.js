import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  credentialUrl: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const certificates = mongoose.model("certificates", certificateSchema);
export default certificates;
