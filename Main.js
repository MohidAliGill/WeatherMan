const Parse = require('./Parse.js');
const Calculate = require('./Calculate.js');

class Main{
    constructor (){
      this.data = {};
      this.fileNames = [];
      this.args = process.argv;
      this.parser = new Parse(this.args[2],this.fileNames);
      this.calculate = new Calculate(this.data);
    }
  
    checkArgs = () => {
      if (this.args.length<5){
        let err = new Error("Min arguments not met");
        console.log(err.message);
        return err;
      }
  
      if ((this.args.length%2)===0){
        let err = new Error("Error in arguments");
        console.log(err.message);
        return err;
      }
      this.callParse()
    }
  
    callParse = () =>{
      for (let i=4; i<this.args.length; i=i+2){
        let [year,month] = this.args[i].split('/');
        if (this.data[year] && ((typeof month === 'undefined') || (this.data[year][month]))){
            continue;
        }
        this.parser.filterFiles(year,month);
      }
      this.parser.loadData(this.data);
      this.processArgs();
    }
  
    processArgs = () => {
      for (let i=3; i<this.args.length; i=i+2){
        let toDo = this.args[i];
        let year;
        let month;
  
        switch (toDo){
          case '-e':
            this.calculate.yearlyStats(this.args[i+1]);
            break;
          case '-a':
            [year,month] = this.args[i+1].split('/');
            this.calculate.monthlyStats(year,`${+month}`);
            break;
          case '-c':
            [year,month] = this.args[i+1].split('/');
  
            this.calculate.dailyStats(year,`${+month}`);
            break;
          default:
            console.log('Wrong Arguments Passed');
            return;
        }
      }
    }
  }

  module.exports = Main;