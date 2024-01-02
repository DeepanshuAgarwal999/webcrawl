import { categoriesEnum } from "@/enum/destinations.enum";
import mongoose from "mongoose";
// this is the old version please refer to new one 
const destinationSchema = new mongoose.Schema({
  placeId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["incity", "outsidecity"],
  },
  city: {
    type: String,
    required: true,
  },
  State: {
    type: String,
  },

  attractionType: {
    type: String,
    enum: ["Shopping", "Religious", "Park", "Mall", "Adventure", "Fun"],
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  searchPageUrl: {
    type: String,
  },
  categories: {
    type: [
      {
        type: String,
        enum: categoriesEnum,
      },
    ],
  },
  categoryName: {
    type: String,
  },

  totalScore: {
    type: String,
  },

  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  imageUrls: {
    type: [String],
  },
  openingHours: {
    type: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        hours: {
          type: String,
        },
      },
    ],
  },
  reviewsDistribution: {
    oneStar: {
      type: Number,
      default: 0,
    },
    twoStar: {
      type: Number,
      default: 0,
    },
    threeStar: {
      type: Number,
      default: 0,
    },
    fourStar: {
      type: Number,
      default: 0,
    },
    fiveStar: {
      type: Number,
      default: 0,
    },
  },
  postalCode: {
    type: String,
  },

  reviewsCount: Number,

  createdAt: Date,

  updatedAt: Date,
});
const Destination =
  mongoose.models.Destination ||
  mongoose.model("Destination", destinationSchema);
export default Destination;
// Export the model
