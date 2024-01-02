import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

// Export the model
export const CityModal = mongoose.modelNames("City",citySchema);