import {num2name} from './months.js';

export default class Printer{

    printYearlyStats = (props) => {
      console.log('\n', props['year'] ,'\n');
  
      let [dateMaxTemp, toNameMaxTemp] = props['dataMaxTemp']['date'].split('/');
      let monthMaxTemp = num2name(toNameMaxTemp);
      
      console.log('Highest:', props['dataMaxTemp']['temp'] + 'C on', monthMaxTemp, dateMaxTemp);
  
      let [dateMinTemp, toNameMinTemp] = props['dataMinTemp']['date'].split('/');
      let monthMinTemp = num2name(toNameMinTemp);
      
      console.log('Lowest:', props['dataMinTemp']['temp'] + 'C on', monthMinTemp, dateMinTemp);
  
      let [dateMaxHumid, toNameMaxHumid] = props['dataMaxHumid']['date'].split('/');
      let monthMaxHumid = num2name(toNameMaxHumid);
      
      console.log('Humidity:', props['dataMaxHumid']['temp'] + '% on', monthMaxHumid, dateMaxHumid);
    }
  
    printMonthlyStats = (props) => {
      console.log('\n', props['year'] + '/' + props['month'], '\n');
  
      console.log('Highest Average:', props['avgMaxTemp'] + 'C');
      console.log('Lowest Average:', props['avgMinTemp'] + 'C');
      console.log('Average Mean Humidity:', props['avgHumid'] + '%');
    }
  
    printDailyStats = (props) => {
      // maxTemp, minTemp, day
      let maxStr = '';
      let minStr = '';
      let maxNeg = 0;
      let minNeg = 0;
      let minCol = ['\x1b[34m', '\x1b[32m'];
      let maxCol = ['\x1b[31m', '\x1b[35m'];

      if (props['maxTemp'] === '' || props['minTemp'] === ''){
        if (+props['day']<10){
          console.log('0' + props['day'], 'DATA DOES NOT EXIST');
        }
        else{
          console.log(props['day'], 'DATA DOES NOT EXIST');
        }
        return;
      }

      if (+props['maxTemp'] >= 0 && +props['minTemp'] < 0){
        props['minTemp'] = props['minTemp'] * -1;
        minNeg = 1;
      }
  
      else if (+props['maxTemp'] < 0 && +props['minTemp'] < 0){
        props['maxTemp'] = props['maxTemp'] * -1;
        props['minTemp'] = props['minTemp'] * -1;
        minNeg = 1;
        maxNeg = 1;
      }

      for (let i=0; i<+props['minTemp']; i++){
        minStr += '+';
      }
      for (let i=0; i<+props['maxTemp']; i++){
        maxStr += '+';
      }

      if (+props['day']<10){
        console.log('0' + props['day'], minCol[minNeg] + minStr + maxCol[maxNeg] + maxStr + "\x1b[37m", props['minTemp'] + 'C - ' + props['maxTemp'] + 'C');
      }
      else{
        console.log(props['day'], minCol[minNeg] + minStr + maxCol[maxNeg] + maxStr + "\x1b[37m", props['minTemp'] + 'C - ' + props['maxTemp'] + 'C');
      }
    }
  }