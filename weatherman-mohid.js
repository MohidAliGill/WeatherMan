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

class Calculate{

  constructor (data){
    this.data = data;
    this.printer = new Printer();

  }

  yearlyStats = (year) => {

    this.highestTemp = {'date':null, 'temp':-Infinity};
    this.lowestTemp = {'date':null, 'temp':Infinity};
    this.humidityHigh = {'date':null, 'temp':-Infinity};

    for (let month in this.data[year]){
      for (let day in this.data[year][month]){
        let dayData = this.data[year][month][day];
        let dayMaxTemp = dayData['maxTemp'];
        let dayMinTemp = dayData['minTemp'];
        let dayMaxHumid = dayData['humidity'];
        let todayDate = day + '/' + month;

        if (dayMaxTemp !== '' && (dayMaxTemp > this.highestTemp['temp'])){
          this.highestTemp = {'date':todayDate,
                              'temp':parseInt(dayMaxTemp)

          };
        }

        if (dayMinTemp !== '' && (dayMinTemp < this.lowestTemp['temp'])){
          this.lowestTemp = {'date':todayDate,
                             'temp':parseInt(dayMinTemp)

          };
        }

        if (dayMaxHumid !== '' && (dayMaxHumid > this.humidityHigh['temp'])){
          this.humidityHigh = {'date':todayDate,
                               'temp':parseInt(dayMaxHumid)
          };
        }
      }
    }
    this.printer.printYearlyStats(this.highestTemp, this.lowestTemp, this.humidityHigh, year);
  }

  monthlyStats = (year, month) => {

    this.avgHighTemp = {'count':0, 'sum':0};
    this.avgLowTemp = {'count':0, 'sum':0};
    this.avgMeanHumidity = {'count':0, 'sum':0};

    for (let day in this.data[year][month]){
      
      let dayData = this.data[year][month][day];
      
      let dayMaxTemp = dayData['maxTemp'];
      let dayMinTemp = dayData['minTemp'];
      let dayMeanHumid = dayData['meanHumidity'];

      if (dayMaxTemp !== ''){
        this.avgHighTemp['count']++;
        this.avgHighTemp['sum'] += +dayMaxTemp;
      }

      if (dayMinTemp !== ''){
        this.avgLowTemp['count']++;
        this.avgLowTemp['sum'] += +dayMinTemp;
      }

      if (dayMeanHumid !== ''){
        this.avgMeanHumidity['count']++;
        this.avgMeanHumidity['sum'] += +dayMeanHumid;
      }
    }

    let avgMaxTemp = this.avgHighTemp['sum']/this.avgHighTemp['count'];
    let avgMinTemp = this.avgLowTemp['sum']/this.avgLowTemp['count'];
    let avgHumid = this.avgMeanHumidity['sum']/this.avgMeanHumidity['count'];
    
    avgMaxTemp = avgMaxTemp.toFixed(1);
    avgMinTemp = avgMinTemp.toFixed(1);
    avgHumid = avgHumid.toFixed(1);

    this.printer.printMonthlyStats(avgMaxTemp, avgMinTemp, avgHumid, year, month);
  }

  dailyStats = (year, month) => {

    console.log('\n', year + '/' + month, '\n');
    for (let day in this.data[year][month]){
      
      let dayData = this.data[year][month][day];

      let maxTemp = dayData['maxTemp'];
      let minTemp = dayData['minTemp'];

      this.printer.printDailyStats(maxTemp, minTemp, day);
    }
  }
}

class Printer{

  printYearlyStats = (dataMaxTemp, dataMinTemp, dataMaxHumid, year) => {

    console.log('\n', year ,'\n');

    let [dateMaxTemp, toNameMaxTemp] = dataMaxTemp['date'].split('/');
    let monthMaxTemp = this.getNameOfMonth(toNameMaxTemp);
    
    console.log('Highest:', dataMaxTemp['temp'] + 'C on', monthMaxTemp, dateMaxTemp);

    let [dateMinTemp, toNameMinTemp] = dataMinTemp['date'].split('/');
    let monthMinTemp = this.getNameOfMonth(toNameMinTemp);
    
    console.log('Lowest:', dataMinTemp['temp'] + 'C on', monthMinTemp, dateMinTemp);

    let [dateMaxHumid, toNameMaxHumid] = dataMaxHumid['date'].split('/');
    let monthMaxHumid = this.getNameOfMonth(toNameMaxHumid);
    
    console.log('Humidity:', dataMaxHumid['temp'] + '% on', monthMaxHumid, dateMaxHumid);
  }

  printMonthlyStats = (avgMaxTemp, avgMinTemp, avgHumid, year, month) => {
    
    console.log('\n', year + '/' + month, '\n');

    console.log('Highest Average:', avgMaxTemp + 'C');
    console.log('Lowest Average:', avgMinTemp + 'C');
    console.log('Average Mean Humidity:', avgHumid + '%');
  }

  printDailyStats = (maxTemp, minTemp, day) => {

    let maxStr = '';
    let minStr = '';

    if (maxTemp === '' || minTemp === ''){
      if (+day<10){
        console.log('0' + day, 'DATA DOES NOT EXIST');
      }
      else{
        console.log(day, 'DATA DOES NOT EXIST');
      }
      return;
    }

    if (+maxTemp >= 0 && +minTemp >= 0 ){
      for (let i=0; i<+minTemp; i++){
        minStr += '+';
      }
      for (let i=+minTemp; i<+maxTemp; i++){
        maxStr += '+';
      }
      if (+day<10){
        console.log('0' + day, '\x1b[34m' + minStr +'\x1b[31m' + maxStr + "\x1b[37m", minTemp + 'C - ' + maxTemp + 'C');
      }
      else{
        console.log(day, '\x1b[34m' + minStr + '\x1b[31m' + maxStr + "\x1b[37m", minTemp + 'C - ' + maxTemp + 'C');
      }
    }

    else if (+maxTemp >= 0 && +minTemp < 0){
      minTemp = minTemp * -1;
      for (let i = 0; i < +maxTemp; i++){
        maxStr = maxStr + '+';
      }
      for (let i = 0; i < minTemp; i++){
        minStr = minStr + '+';
      }
      if (+day<10){
        console.log('0' + day, "\x1b[32m" + minStr +'\x1b[31m' + maxStr + "\x1b[37m", '-' + minTemp + 'C - ' + maxTemp + 'C');
      }
      else{
        console.log(day, "\x1b[32m" + minStr + '\x1b[31m' + maxStr + "\x1b[37m", '-' + minTemp + 'C - ' + maxTemp + 'C');
      }
    }

    else{
      maxTemp = maxTemp * -1;
      minTemp = minTemp * -1;

      for (let i = 0; i < maxTemp; i++){
        maxStr = maxStr + '+'
      }
      for (let i = 0; i<minTemp-maxTemp; i++){
        minStr = minStr + '+';
      }
      if (+day<10){
        console.log('0' + day, "\x1b[32m" + minStr + "\x1b[35m" + maxStr + "\x1b[37m", '-' + minTemp + 'C - -' + maxTemp + 'C');
      }
      else{
        console.log(day, "\x1b[32m" + minStr + "\x1b[35m" + maxStr + "\x1b[37m", '-' + minTemp + 'C - -' + maxTemp + 'C');
      }
    }
  }

  getNameOfMonth = (monthNumber) => {

    let monthName;
    
    switch (monthNumber){
      case '1':
        monthName = 'Jan';
        break;
      case '2':
        monthName = 'Feb';
        break;
      case '3':
        monthName = 'Mar';
        break;
      case '4':
        monthName = 'Apr';
        break;
      case '5':
        monthName = 'May';
        break;
      case '6':
        monthName = 'Jun';
        break;
      case "7":
        monthName = 'Jul';
        break;
      case '8':
        monthName = 'Aug';
        break;
      case '9':
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

    return monthName;
  }
}

(function run(){
  console.time('\nrun time');
  let driver = new Main();
  driver.checkArgs();
  console.timeEnd('\nrun time');
}());

