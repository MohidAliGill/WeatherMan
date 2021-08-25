class Parse{

    constructor(path){
      this.folderPath = path;
      this.fileNames;
      this.requiredFiles = [];
      this.getFilesFromFolder(this.folderPath);
      
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
  
        let month = this.monthName2MonthNum(monthName);
  
        if (!toLoad[year][month]){
          toLoad[year][month] = {};
          let rtnArr = this.readThisFile(file);
          rtnArr.forEach(line => {
            toLoad[year][month][line[0]] = {'maxTemp':line[1],
                                            'minTemp':line[2],
                                            'humidity':line[3],
                                            'meanHumidity':line[4]};
          })
        }
      });
    }
  
    readThisFile = (fileName) => {
      let fs = require('fs');
      let filePath = this.folderPath + '/' + fileName;
      let rtnArr = [];
  
      let metaData = fs.readFileSync(filePath,{encoding:'utf8', flag:'r'});
      metaData = metaData.split('\n');
      for (let i=1;i<metaData.length;i++){
        let toFilter = metaData[i].split(',');
        if (toFilter.length>1){
          let currDate = toFilter[0].split('-')[2];
          rtnArr.push([currDate,toFilter[1],toFilter[3],toFilter[7],toFilter[8]]);
        }
      }
      return rtnArr;
    }
  
    monthName2MonthNum = (monthName) => {
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
      return month;
    }
  }

  module.exports = Parse;