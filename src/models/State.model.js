import mongoose from "mongoose";

// State model schema
const stateSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

// Export the model
export const StateModal = mongoose.model("State", stateSchema);
