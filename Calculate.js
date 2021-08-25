const Printer = require('./Printer.js')

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
  
  module.exports = Calculate;