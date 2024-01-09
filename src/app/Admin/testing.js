import fs from "fs/promises";
import path from "path";

const filePath = path.join(__dirname, "dataset.json");

(async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  } catch (error) {
    console.error("Error reading the file:", error.message);
  }
})();
