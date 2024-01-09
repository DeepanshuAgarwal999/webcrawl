"use server";

import fs from "fs/promises";
import connectDB from "@/config/db";
import Destination from "@/models/Destination.model";

export const readJsonFile = async (selectedFile) => {
  const data = await fs.readFile(selectedFile, "utf-8");
  const jsonData = await JSON.parse(data);
  return jsonData;
};

const findUniqueSubTypes = (filteredDestinations) => {
  const subTypesNestedArrays = filteredDestinations.map(
    (destination) => destination.subtype
  );
  const uniqueSubTypes = Array.from(new Set(subTypesNestedArrays.flat()));
  return uniqueSubTypes;
};

export const addDestinations = async (destinations) => {
  try {
    await connectDB();

    // Optimized query using $nin operator:
    const existingDestinationIds = await Destination.distinct("id", {
      id: { $nin: destinations.map((dest) => dest.id) },
    });

    const newDestinations = destinations.filter(
      (dest) => !existingDestinationIds.includes(dest.id)
    );

    if (newDestinations.length === 0) {
      console.log("No new destinations to add");
      return;
    }
    console.log(findUniqueSubTypes(newDestinations));
    const insertResult = await Destination.insertMany(newDestinations);
    // console.log(insertResult);
    // return insertResult;
  } catch (error) {
    console.error("Error adding destinations:", error);
  } finally {
    // Close the database connection here if applicable
  }
};

export const addHotels = async (hotelData) => {
  try {
    // Efficient filtering using a Set:
    const allowedCategories = new Set([
      "Resort hotel",
      "Bar",
      "Serviced apartment",
      "Student dormitory",
      "Travel agency",
      "Extended stay hotel",
      "Guest house",
      "Hotel",
      "Hostel",
      "Indoor lodging",
      "Homestay",
      "Resort hotel",
    ]);

    const hotels = hotelData?.filter(({ categoryName }) =>
      allowedCategories.has(categoryName)
    );

    if (!hotels) {
      return null;
    }

    // Optimized query using $nin and distinct projection:
    const existingHotelIds = await HotelModel.distinct("placeId", {
      placeId: { $nin: hotels.map((hotel) => hotel.placeId) },
    });

    const newHotels = hotels.filter(
      (hotel) => !existingHotelIds.includes(hotel.placeId)
    );

    if (newHotels.length === 0) {
      console.log("No new hotels to add");
      return;
    }

    // Insert new hotels efficiently:
    const insertResult = await HotelModel.insertMany(newHotels);
    console.log(
      insertResult.insertedCount > 0
        ? "New hotels added successfully"
        : "Unable to add new hotels"
    );
  } catch (error) {
    console.error("Error filtering and adding hotels:", error);
  }
};
