import Parse from "./Parse.js";
import Calculate from "./Calculate.js";
import * as commands from "./constants/commands.js";

/**
 * Main driver class check for args and calls the required functions
 */
export default class Main {
  /**
   * Represents the driver Main class
   * @constructor
   */
  constructor() {
    this.data = {};
    this.args = process.argv;
    this.parser = new Parse(this.args[2]);
    this.calculate = new Calculate(this.data);
    this.checkArgs();
  }

  /**
   * Checks if valid arguments are passed to the programme
   * @returns {Error} - If error occurs it is returned
   */
  checkArgs = () => {
    if (this.args.length < 5) {
      const err = new Error("Min arguments not met");
      console.log(err.message);
      return err;
    }

    if (this.args.length % 2 === 0) {
      const err = new Error("Error in arguments");
      console.log(err.message);
      return err;
    }
    this.callParse();
  };

  /**
   * Reads the required files and load its data to a JSON
   */
  callParse = () => {
    for (let i = 4; i < this.args.length; i = i + 2) {
      const [year, month] = this.args[i].split("/");
      // check if the year & month data is already loaded
      if (this.data[year] && (!month || this.data[year][month])) {
        continue; // if the data is loaded we skip to the next iteration
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

  /**
   *  Handles all the arguments, calls the required function passing the given parameters (year, month)
   */
  processArgs = () => {
    for (let i = 3; i < this.args.length; i = i + 2) {
      const toDo = this.args[i];
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
