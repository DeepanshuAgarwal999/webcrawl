import mongoose from "mongoose";
// this is the old version please refer to new one
const destinationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategories: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      required: true,
    },
    locationString: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    rating: {
      type: Number,
      // required: true,
    },
    phone: String,
    address: {
      type: String,
      required: true,
    },
    addressObj: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      country: String,
      postalcode: String,
    },
    email: {
      type: String,
    },
    latitude: {
      type: Number,
      // required: true,
    },
    longitude: {
      type: Number,
      // required: true,
    },
    website: String,
    neighborhoodLocations: {
      type: [{ String }],
      default: [],
    },
    nearestBusStations: {
      type: [String],
      default: [],
    },
    ratingHistogram: {
      count1: Number,
      count2: Number,
      count3: Number,
      count4: Number,
      count5: Number,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Destination =
  mongoose.models.Destination ||
  mongoose.model("Destination", destinationSchema);
export default Destination;
// Export the model
