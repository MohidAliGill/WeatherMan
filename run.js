import Main from './Main.js';

(function run(){
    console.time('\nrun time');
    let driver = new Main();
    driver.checkArgs();
    console.timeEnd('\nrun time');
  }());