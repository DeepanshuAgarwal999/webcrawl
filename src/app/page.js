import React from "react";
import fs from "fs/promises";
import connectDB from "@/config/db";
// import DestinationModel from "@/models/Destination.model";
import HotelModel from "@/models/Hotel.model";
import DestinationModel from "@/models/AttractionDestination.model";

// const filePath = path.join(__dirname, "dataset.json");

const page = () => {
  connectDB();

  const getReadFile = async () => {
    const data = await fs.readFile("destinationDataset.json", "utf-8");
    const jsonData = await JSON.parse(data);
    return jsonData;
  };
  // readFile()
  const filterDestinations = async (data) => {
    try {
      const destinationData = await data;
      // const destinations = destinationData?.filter(({ categoryName }) =>
      //   [
      //     "Tourist attraction",
      //     "Park",
      //     "Hindu temple",
      //     "Garden",
      //     "Museum",
      //     "Nature preserve",
      //     "Community garden",
      //     "Memorial park",
      //     "Jain temple",
      //     "Lake",
      //     "Historical landmark",
      //     "War memorial",
      //     "City park",
      //     "Government office",
      //     "Place of worship",
      //     "Spiritist center",
      //     "Flower market",
      //     "Historical place",
      //     "Religious organization",
      //   ].includes(categoryName)
      // );
      const destinations = destinationData?.map((item) => item);
      console.log(destinations);
      if (!destinations || destinations.length === 0) {
        return console.log("No destinations to process");
      }

      // Check if each destination already exists in the database
      const existingDestinationIds = (
        await DestinationModel.find({
          id: { $in: destinations.map((dest) => dest.id) },
        })
      ).map((existingDestination) => existingDestination.id);

      const newDestinations = destinations.filter(
        (dest) => !existingDestinationIds.includes(dest.id)
      );

      if (newDestinations.length === 0) {
        return console.log("No new destinations to add");
      }

      // Add only the new destinations to the database
      const addDestinations = await DestinationModel.insertMany(
        newDestinations
      );

      if (addDestinations) {
        console.log("New destinations added successfully");
      } else {
        console.log("Unable to add new destinations");
      }
    } catch (error) {
      console.warn("Problem with destinations :: ", error);
    }
  };
  const filterHotels = async (data) => {
    try {
      const hotelData = await data;
      const hotels = hotelData?.filter(({ categoryName }) =>
        [
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
        ].includes(categoryName)
      );
      if (!hotels) {
        return null;
      }
      const existingHotelIds = (
        await HotelModel.find({
          placeId: { $in: hotels.map((hotel) => hotel.placeId) },
        })
      ).map((existingHotel) => existingHotel.placeId);

      const newHotels = hotels.filter(
        (hotel) => !existingHotelIds.includes(hotel.placeId)
      );

      if (newHotels.length === 0) return console.log("No new hotels to add");
      else {
        const addHotels = await HotelModel.insertMany(newHotels);
        if (addHotels) {
          console.log("New hotels added successfully");
        } else {
          console.log("Unable to add new hotels");
        }
      }
    } catch (error) {
      console.log("hotels error :: ", error);
    }
  };
  const jsonData = getReadFile();
  filterDestinations(jsonData);
  filterHotels(jsonData);
  return <div>page</div>;
};

export default page;
