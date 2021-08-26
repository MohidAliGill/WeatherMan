import Parse from "./Parse.js";
import Calculate from "./Calculate.js";
import * as commands from "./constants/commands.js";

export default class Main {
  constructor() {
    this.data = {};
    this.fileNames = [];
    this.args = process.argv;
    this.parser = new Parse(this.args[2], this.fileNames);
    this.calculate = new Calculate(this.data);
    this.checkArgs();
  }

  checkArgs = () => {
    if (this.args.length < 5) {
      let err = new Error("Min arguments not met");
      console.log(err.message);
      return err;
    }

    if (this.args.length % 2 === 0) {
      let err = new Error("Error in arguments");
      console.log(err.message);
      return err;
    }
    this.callParse();
  };

  callParse = () => {
    for (let i = 4; i < this.args.length; i = i + 2) {
      let [year, month] = this.args[i].split("/");
      if (
        this.data[year] &&
        (typeof month === "undefined" || this.data[year][month])
      ) {
        continue;
      }
      this.parser.filterFiles(year, month);
    }
    this.parser.loadData(this.data);
    try {
      this.processArgs();
    } catch (e) {
      console.log("Error Occured: " + e.message);
    }
  };

  processArgs = () => {
    for (let i = 3; i < this.args.length; i = i + 2) {
      let toDo = this.args[i];
      let year;
      let month;

      switch (toDo) {
        case commands.yearlyStats:
          this.calculate.yearlyStats(this.args[i + 1]);
          break;
        case commands.monthlyStats:
          [year, month] = this.args[i + 1].split("/");
          this.calculate.monthlyStats(year, month);
          break;
        case commands.dailyStats:
          [year, month] = this.args[i + 1].split("/");

          this.calculate.dailyStats(year, month);
          break;
        default:
          console.log("Wrong Arguments Passed");
          return;
      }
    }
  };
}
