import Main from "./Main.js";

(function run() {
  console.time("\nrun time");
  new Main();
  console.timeEnd("\nrun time");
})();
