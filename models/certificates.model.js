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
  issueDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
  },
  credentialId: {
    type: String,
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
