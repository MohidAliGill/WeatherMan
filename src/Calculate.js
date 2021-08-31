import Printer from "./Printer.js";

export default class Calculate {
  constructor(data) {
    this.data = data;
    this.printer = new Printer();
  }

  yearlyStats = (year) => {
    this.highestTemp = { date: null, temp: -Infinity };
    this.lowestTemp = { date: null, temp: Infinity };
    this.humidityHigh = { date: null, temp: -Infinity };

    for (let month in this.data[year]) {
      for (let day in this.data[year][month]) {
        const dayData = this.data[year][month][day];
        const dayMaxTemp = dayData.maxTemp;
        const dayMinTemp = dayData.minTemp;
        const dayMaxHumid = dayData.humidity;
        const todayDate = day + "/" + month;

        if (dayMaxTemp && dayMaxTemp > this.highestTemp.temp) {
          this.highestTemp = { date: todayDate, temp: +dayMaxTemp };
        }

        if (dayMinTemp && dayMinTemp < this.lowestTemp.temp) {
          this.lowestTemp = { date: todayDate, temp: +dayMinTemp };
        }

        if (dayMaxHumid && dayMaxHumid > this.humidityHigh.temp) {
          this.humidityHigh = { date: todayDate, temp: +dayMaxHumid };
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
