import fs from "fs";
import {
  getMonthNameToNumber,
  getMonthNumberToName,
} from "./constants/months.js";

export default class Parse {
  constructor(path) {
    this.folderPath = path;
    this.fileNames = fs.readdirSync(this.folderPath);
    this.requiredFileNames = [];
  }

  filterFiles = (year, month) => {
    let filteredFileNames;
    filteredFileNames = this.fileNames.filter((name) => {
      return name.includes(year);
    });
    if (typeof month !== "undefined") {
      const monthName = getMonthNumberToName(month);
      const temp = filteredFileNames.filter((name) => {
        return name.includes(monthName);
      });

      filteredFileNames = temp;
    }
    this.requiredFileNames = [...this.requiredFileNames, ...filteredFileNames];
  };

  loadData = (dataBank) => {
    this.requiredFileNames.forEach((file) => {
      const temp = file.split("_");
      const year = temp[2];
      const monthName = temp[3].split(".")[0];

      if (!dataBank[year]) {
        dataBank[year] = {};
      }

      const month = getMonthNameToNumber(monthName);

      if (!dataBank[year][month]) {
        dataBank[year][month] = {};
        const fileDataArr = this.filterDataFromFile(file);
        fileDataArr.forEach((line) => {
          dataBank[year][month][line["currDate"]] = line;
        });
      }
    });
  };

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
