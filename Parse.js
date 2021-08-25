import fs from 'fs';
import {num2name, name2num} from './months.js';

export default class Parse{

    constructor(path){
      this.folderPath = path;
      this.fileNames = fs.readdirSync(this.folderPath);
      this.requiredFiles = []; 
    }

  
    filterFiles = (year,month) => {
      let filteredFileNames;
      filteredFileNames =  this.fileNames.filter(name => {
        return name.includes(year);
      });
      if (typeof month !== 'undefined'){
        let monthName = num2name(month);
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
  
        let month = name2num(monthName);
  
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
  }