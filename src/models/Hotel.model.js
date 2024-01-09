import { hotelEnum } from "@/enum/hotel.enum";
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  city: { type: String },
  placeId: {
    type: String,
    unique: true,
    required: true,
  },
  title: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date,
  address: String,
  hotelReviewSummary: String,
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
  imageUrls: [String],
  street: String,
  postalCode: String,
  state: String,
  countryCode: String,
  searchPageUrl: {
    type: String,
  },
  categories: {
    type: [
      {
        type: String,
        enum: hotelEnum,
      },
    ],
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
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
  hotelStars: {
    type: String,
    default: "1",
  },
  imageUrls: {
    type: [
      {
        type: String,
      },
    ],
  },
});

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
export default Hotel;
