'use client';
import React, { useState } from "react";
import { addDestinations, addHotels } from "./components/helper";

const Page = () => {
  const [jsonData, setJsonData] = useState(null);

  const findUniqueSubTypes = (filteredDestinations) =>{
    const subTypesNestedArrays = filteredDestinations.map(destination => destination.subtype);
    const uniqueSubTypes = Array.from(new Set(subTypesNestedArrays.flat()));
    console.info(uniqueSubTypes)
}

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const parsedData = JSON.parse(event.target.result);
        setJsonData(parsedData);
      };
      reader.readAsText(file);
    } else {
      console.error("Invalid file type. Please select a JSON file.");
      setJsonData(null); // Reset state if invalid file type
    }
  };

  const handleFilterDestinations = async (event) => {
    event.preventDefault();
    if (jsonData) {
      findUniqueSubTypes(jsonData)
      await addDestinations(jsonData);
    } else {
      console.error("Please select a JSON file first.");
    }
  };

  const handleFilterHotels = async (event) => {
    event.preventDefault();
    if (jsonData) {
      await addHotels(jsonData);
    } else {
      console.error("Please select a JSON file first.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <input
        type="file"
        className="p-4 border border-gray-300 rounded-md"
        accept=".json"
        onChange={handleFileChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4"
        onClick={handleFilterDestinations}
      >
        Filter Destinations
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md ml-4"
        onClick={handleFilterHotels}
      >
        Filter Hotels
      </button>
    </div>
  );
};

export default Page;