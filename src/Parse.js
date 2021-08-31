import fs from "fs";
import { getMonthIndex, getMonthName } from "./constants/months.js";

/**
 * Class responsible for filtering the required files, reading them and then loading
 * the required data to the JSON
 */
export default class Parse {
  /**
   * Reads the files in the given directory and initializes the required vars
   * @constructor
   * @param {string} path - The path to the folder containing all the files
   */
  constructor(path) {
    this.folderPath = path;
    this.fileNames = fs.readdirSync(this.folderPath);
    this.requiredFileNames = [];
  }

  /**
   * Filters the required files (as per user inputs) from a pool of files and updates them in this.requiredFileNames
   * @param {number} year - year for which the data is required
   * @param {number} month - month for which the data is required
   */
  filterFiles = (year, month) => {
    let filteredFileNames;
    filteredFileNames = this.fileNames.filter((name) => {
      return name.includes(year);
    });
    if (month) {
      const monthName = getMonthName(month);
      const filesForTheMonth = filteredFileNames.filter((name) => {
        return name.includes(monthName);
      });

      filteredFileNames = filesForTheMonth;
    }
    this.requiredFileNames = [...this.requiredFileNames, ...filteredFileNames];
  };

  /**
   * Loads data returned from filterDataFile() to the JSON
   * @param {object} dataBank - reference to the JSON where the data is to be loaded
   */
  loadData = (dataBank) => {
    this.requiredFileNames.forEach((file) => {
      const [, , year, monthNameAndExtension] = file.split("_");
      const monthName = monthNameAndExtension.split(".")[0];

      if (!dataBank[year]) {
        dataBank[year] = {};
      }

      const month = getMonthIndex(monthName);

      if (!dataBank[year][month]) {
        dataBank[year][month] = {};
        const fileDataArr = this.filterDataFromFile(file);
        fileDataArr.forEach((line) => {
          dataBank[year][month][line["currDate"]] = line;
        });
      }
    });
  };

  /**
   * Reads the required file and filters the required usefull data.
   * @param {string} fileName - The name of file to read and extract the useful data from
   * @returns {object} filteredData - An object containing only the required data from the file
   */
  filterDataFromFile = (fileName) => {
    const filePath = this.folderPath + "/" + fileName;
    let filteredData = [];

    let metaData = fs
      .readFileSync(filePath, { encoding: "utf8", flag: "r" })
      .split("\n");

    metaData.forEach((dataLine, ind) => {
      if (ind === 0) {
        return;
      }
      let toFilter = dataLine.split(",");
      if (toFilter.length > 1) {
        const currDate = toFilter[0].split("-")[2];
        filteredData.push({
          currDate: currDate,
          maxTemp: toFilter[1],
          minTemp: toFilter[3],
          humidity: toFilter[7],
          meanHumidity: toFilter[8],
        });
      }
    });
    return filteredData;
  };
}
