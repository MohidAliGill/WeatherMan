import fs from "fs";
import {
  convertMonthNameToNumber,
  convertMonthNumberToName,
} from "./constants/months.js";

export default class Parse {
  constructor(path) {
    this.folderPath = path;
    this.fileNames = fs.readdirSync(this.folderPath);
    this.requiredFiles = [];
  }

  filterFiles = (year, month) => {
    let filteredFileNames;
    filteredFileNames = this.fileNames.filter((name) => {
      return name.includes(year);
    });
    if (typeof month !== "undefined") {
      let monthName = convertMonthNumberToName(month);
      let temp = filteredFileNames.filter((name) => {
        return name.includes(monthName);
      });

      filteredFileNames = temp;
    }
    this.requiredFiles = [...this.requiredFiles, ...filteredFileNames];
  };

  loadData = (toLoad) => {
    this.requiredFiles.forEach((file) => {
      let temp = file.split("_");
      let year = temp[2];
      let monthName = temp[3].split(".")[0];

      if (!toLoad[year]) {
        toLoad[year] = {};
      }

      let month = convertMonthNameToNumber(monthName);

      if (!toLoad[year][month]) {
        toLoad[year][month] = {};
        let rtnArr = this.readThisFile(file);
        rtnArr.forEach((line) => {
          toLoad[year][month][line["currDate"]] = line;
        });
      }
    });
  };

  readThisFile = (fileName) => {
    let filePath = this.folderPath + "/" + fileName;
    let rtnArr = [];

    let metaData = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
    metaData = metaData.split("\n");
    for (let i = 1; i < metaData.length; i++) {
      let toFilter = metaData[i].split(",");
      if (toFilter.length > 1) {
        let currDate = toFilter[0].split("-")[2];
        rtnArr.push({
          currDate: currDate,
          maxTemp: toFilter[1],
          minTemp: toFilter[3],
          humidity: toFilter[7],
          meanHumidity: toFilter[8],
        });
      }
    }
    return rtnArr;
  };
}
