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
        for (let i=0; i<+maxTemp; i++){
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
        for (let i = 0; i<minTemp; i++){
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

  module.exports = Printer;