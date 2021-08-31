import { getMonthName } from "./constants/months.js";
import {
  minCol,
  maxCol,
  minus,
  plus,
  natural,
} from "./constants/printController.js";

/**
 * Class responsible for printing all the calculated data
 */
export default class Printer {
  /**
   * Prints the max temp, min temp , max humidity for the given year and their dates
   * @param {object} props - The calculated data to be printed
   */
  printYearlyStats = (props) => {
    console.log("\n", props.year, "\n");

    const [dateMaxTemp, toNameMaxTemp] = props.highestTemp.date.split("/");
    const monthMaxTemp = getMonthName(toNameMaxTemp);

    console.log(
      "Highest:",
      props.highestTemp.temp + "C on",
      monthMaxTemp,
      dateMaxTemp
    );

    const [dateMinTemp, toNameMinTemp] = props.lowestTemp.date.split("/");
    const monthMinTemp = getMonthName(toNameMinTemp);

    console.log(
      "Lowest:",
      props.lowestTemp.temp + "C on",
      monthMinTemp,
      dateMinTemp
    );

    const [dateMaxHumid, toNameMaxHumid] = props.humidityHigh.date.split("/");
    const monthMaxHumid = getMonthName(toNameMaxHumid);

    console.log(
      "Humidity:",
      props.humidityHigh.temp + "% on",
      monthMaxHumid,
      dateMaxHumid
    );
  };

  /**
   * Prints the average max temp, average min temp, average mean humidity for the month
   * @param {object} props - The calculated data to be printed
   */
  printMonthlyStats = (props) => {
    console.log("\n", props.year + "/" + props.month, "\n");

    console.log("Highest Average:", props.avgMaxTemp + "C");
    console.log("Lowest Average:", props.avgMinTemp + "C");
    console.log("Average Mean Humidity:", props.avgHumid + "%");
  };

  /**
   * Graphically represents the min temp and max temp of each day of the month
   * @param {object} props - The calculated data to be printed
   */
  printDailyStats = (props) => {
    let maxNeg = 0;
    let minNeg = 0;

    if (+props.day < 10) {
      props.day = "0" + props.day;
    }

    if (!props.maxTemp || !props.minTemp) {
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
