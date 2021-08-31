import Printer from "./Printer.js";

/**
 * Class responsible for all the calculations of the tasks
 */
export default class Calculate {
  /**
   * @constructor
   * @param {object} data - A reference to the JSON containing all the data to perform calculations on
   */
  constructor(data) {
    this.data = data;
    this.printer = new Printer();
  }

  /**
   * Calculates the max temp, min temp and max humidity for the given year
   * @param {number} year - The year of which the data is required
   * Calls the printYearlyStats from the Printer class after its calculations are complete
   */
  yearlyStats = (year) => {
    this.highestTemp = { date: null, temp: -Infinity };
    this.lowestTemp = { date: null, temp: Infinity };
    this.humidityHigh = { date: null, temp: -Infinity };

    for (let month in this.data[year]) {
      for (let day in this.data[year][month]) {
        const dayData = this.data[year][month][day];
        const { maxTemp, minTemp, humidity } = dayData;
        const todayDate = day + "/" + month;

        if (maxTemp && maxTemp > this.highestTemp.temp) {
          this.highestTemp = { date: todayDate, temp: +maxTemp };
        }

        if (minTemp && minTemp < this.lowestTemp.temp) {
          this.lowestTemp = { date: todayDate, temp: +minTemp };
        }

        if (humidity && humidity > this.humidityHigh.temp) {
          this.humidityHigh = { date: todayDate, temp: +humidity };
        }
      }
    }

    this.printer.printYearlyStats({
      highestTemp: this.highestTemp,
      lowestTemp: this.lowestTemp,
      humidityHigh: this.humidityHigh,
      year: year,
    });
  };

  /**
   * Calculates the average max temp, average min temp and average mean humidity for the given month of the given year
   * @param {number} year - The month of this year's data is required
   * @param {number} month - The month for which data is required
   * Calls the printMonthlyStats from Printer class after its execution is complete
   */
  monthlyStats = (year, month) => {
    month = `${+month}`;

    this.avgHighTemp = { count: 0, sum: 0 };
    this.avgLowTemp = { count: 0, sum: 0 };
    this.avgMeanHumidity = { count: 0, sum: 0 };

    for (let day in this.data[year][month]) {
      let dayData = this.data[year][month][day];

      const dayMaxTemp = dayData.maxTemp;
      const dayMinTemp = dayData.minTemp;
      const dayMeanHumid = dayData.meanHumidity;

      if (dayMaxTemp) {
        this.avgHighTemp.count++;
        this.avgHighTemp.sum += +dayMaxTemp;
      }

      if (dayMinTemp) {
        this.avgLowTemp.count++;
        this.avgLowTemp.sum += +dayMinTemp;
      }

      if (dayMeanHumid) {
        this.avgMeanHumidity.count++;
        this.avgMeanHumidity.sum += +dayMeanHumid;
      }
    }

    const avgMaxTemp = (this.avgHighTemp.sum / this.avgHighTemp.count).toFixed(
      1
    );
    const avgMinTemp = (this.avgLowTemp.sum / this.avgLowTemp.count).toFixed(1);
    const avgHumid = (
      this.avgMeanHumidity.sum / this.avgMeanHumidity.count
    ).toFixed(1);

    this.printer.printMonthlyStats({
      avgMaxTemp: avgMaxTemp,
      avgMinTemp: avgMinTemp,
      avgHumid: avgHumid,
      year: year,
      month: month,
    });
  };

  /**
   * Calculates the max temp and min temp for each day
   * @param {number} year - The month of this year's data is required
   * @param {number} month - The month for which each days data is required
   * Calls the printDailyStats from Printer class after its execution is complete
   */
  dailyStats = (year, month) => {
    month = `${+month}`;
    console.log("\n", year + "/" + month, "\n");
    for (let day in this.data[year][month]) {
      let dayData = this.data[year][month][day];

      const maxTemp = dayData.maxTemp;
      const minTemp = dayData.minTemp;

      this.printer.printDailyStats({
        maxTemp: maxTemp,
        minTemp: minTemp,
        day: day,
      });
    }
  };
}
