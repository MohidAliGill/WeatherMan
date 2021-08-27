import { getMonthNumberToName } from "./constants/months.js";
import {
  minCol,
  maxCol,
  minus,
  plus,
  natural,
} from "./constants/printController.js";

export default class Printer {
  printYearlyStats = (props) => {
    console.log("\n", props.year, "\n");

    let [dateMaxTemp, toNameMaxTemp] = props.highestTemp.date.split("/");
    let monthMaxTemp = getMonthNumberToName(toNameMaxTemp);

    console.log(
      "Highest:",
      props.highestTemp.temp + "C on",
      monthMaxTemp,
      dateMaxTemp
    );

    let [dateMinTemp, toNameMinTemp] = props.lowestTemp.date.split("/");
    let monthMinTemp = getMonthNumberToName(toNameMinTemp);

    console.log(
      "Lowest:",
      props.lowestTemp.temp + "C on",
      monthMinTemp,
      dateMinTemp
    );

    let [dateMaxHumid, toNameMaxHumid] = props.humidityHigh.date.split("/");
    let monthMaxHumid = getMonthNumberToName(toNameMaxHumid);

    console.log(
      "Humidity:",
      props.humidityHigh.temp + "% on",
      monthMaxHumid,
      dateMaxHumid
    );
  };

  printMonthlyStats = (props) => {
    console.log("\n", props.year + "/" + props.month, "\n");

    console.log("Highest Average:", props.avgMaxTemp + "C");
    console.log("Lowest Average:", props.avgMinTemp + "C");
    console.log("Average Mean Humidity:", props.avgHumid + "%");
  };

  printDailyStats = (props) => {
    let maxNeg = 0;
    let minNeg = 0;

    if (+props.day < 10) {
      props.day = "0" + props.day;
    }

    if (props.maxTemp === "" || props.minTemp === "") {
      console.log(props.day, "DATA DOES NOT EXIST");
      return;
    }

    if (+props.maxTemp >= 0 && +props.minTemp < 0) {
      props.minTemp = props.minTemp * -1;
      minNeg = 1;
    } else if (+props.maxTemp < 0 && +props.minTemp < 0) {
      props.maxTemp = props.maxTemp * -1;
      props.minTemp = props.minTemp * -1;
      minNeg = 1;
      maxNeg = 1;
    }

    let maxStr = plus.repeat(+props.maxTemp);
    let minStr = plus.repeat(+props.minTemp);

    console.log(
      props.day,
      minCol[minNeg] + minStr + maxCol[maxNeg] + maxStr + natural,
      minus[minNeg] +
        props.minTemp +
        "C - " +
        minus[maxNeg] +
        props.maxTemp +
        "C"
    );
  };
}
