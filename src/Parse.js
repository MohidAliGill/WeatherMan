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

  loadData = (toLoad) => {
    this.requiredFileNames.forEach((file) => {
      const temp = file.split("_");
      const year = temp[2];
      const monthName = temp[3].split(".")[0];

      if (!toLoad[year]) {
        toLoad[year] = {};
      }

      const month = getMonthNameToNumber(monthName);

      if (!toLoad[year][month]) {
        toLoad[year][month] = {};
        const rtnArr = this.readThisFile(file);
        rtnArr.forEach((line) => {
          toLoad[year][month][line["currDate"]] = line;
        });
      }
    });
  };

  readThisFile = (fileName) => {
    const filePath = this.folderPath + "/" + fileName;
    let rtnArr = [];

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
        rtnArr.push({
          currDate: currDate,
          maxTemp: toFilter[1],
          minTemp: toFilter[3],
          humidity: toFilter[7],
          meanHumidity: toFilter[8],
        });
      }
    });
    return rtnArr;
  };
}
