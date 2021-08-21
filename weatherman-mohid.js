class Main{
  constructor (){
    this.data = {};
    this.fileNames = [];
    this.args = process.argv;
    this.parser = new Parse(this.args[2],this.fileNames);
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
    //console.log(this.data);
  }
}


class Parse{

  constructor(path){
    this.folderPath = path;
    this.fileNames;
    this.requiredFiles = [];
    this.getFilesFromFolder(this.folderPath);
    //console.log(this.fileNames);
    
  }

  getFilesFromFolder = (path) => {
    const fs = require('fs');
    this.fileNames = fs.readdirSync(path);
  }

  filterFiles = (year,month) => {
    let filteredFileNames;
    filteredFileNames =  this.fileNames.filter(name => {
      return name.includes(year);
    });

    if (typeof month !== 'undefined'){
      let monthName;

      switch (month){
        case '1':
        case '01':
          monthName = 'Jan';
          break;
        case '2':
        case '02':
          monthName = 'Feb';
          break;
        case '3':
        case '03':
          monthName = 'Mar';
          break;
        case '4':
        case '04':
          monthName = 'Apr';
          break;
        case '5':
        case '05':
          monthName = 'May';
          break;
        case '6':
        case '06':
          monthName = 'Jun';
          break;
        case "7":
        case '07':
          monthName = 'Jul';
          break;
        case '8':
        case '08':
          monthName = 'Aug';
          break;
        case '9':
        case '09':
          monthName = 'Sep';
          break;
        case '10':
          monthName = 'Oct';
          break;
        case '11':
          monthName = 'Nov';
          break;
        case '12':
          monthName = 'Dec';
          break;
      }

      let temp = filteredFileNames.filter(name => {
        return name.includes(monthName);
      });

      filteredFileNames = temp;
    }
    this.requiredFiles = [...this.requiredFiles,...filteredFileNames];
  }

  loadData = (toLoad) => {
    this.requiredFiles.forEach(file => {
      let temp = file.split('_');
      let year = temp[2];
      let monthName = temp[3].split('.')[0];

      if (!toLoad[year]){
        toLoad[year] = {};
      }

      let month;
      switch (monthName){
        case 'Jan':
          month = '1';
          break;
        case 'Feb':
          month = '2';
          break;
        case 'Mar':
          month = '3';
          break;
        case 'Apr':
          month = '4';
          break;
        case 'May':
          month = '5';
          break;
        case 'Jun':
          month = '6';
          break;
        case 'Jul':
          month = "7";
          break;
        case 'Aug':
          month = "8";
          break;
        case 'Sep':
          month = "9";
          break;
        case 'Oct':
          month = '10';
          break;
        case 'Nov':
          month = '11';
          break;
        case 'Dec':
          month = '12';
          break;
      }
      console.log(year, month);

      if (toLoad[year][month]){
        continue;
      }

      let reqData = this.readFile(file);
      console.log(reqData);
    })
  }

  readFile = (fileName) => {
    return 'hello';
  }
}


(function run(){
  let driver = new Main();
  driver.checkArgs();
}());

