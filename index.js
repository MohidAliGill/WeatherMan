import Main from "./src/Main.js";

/**
 * Driver function an IIFE
 * Runs the programme and calculates the run time
 */
(function run() {
  console.time("\nrun time");
  new Main();
  console.timeEnd("\nrun time");
})();
