This assignment can perform three tasks for you which are as follows:

1. You can get the yearly stats which include
   a) Date and temperature of the day with max temp in the year
   b) Date and temperature of the day with min temp in the year
   c) Date and humidity of the day with max humidity in the year

   To get this data, run the following command

   node index.js <folderPath> -e <year>
   e.g:
   node index.js ./weatherfiles -e 2013

2. You can get monthly stats which include
   a) Average max temp of the month
   b) Average min temp of the month
   c) Average mean humidity of the month

   To get this data, run the following command

   node index.js <folderPath> -a <year>/<month>
   e.g:
   node index.js ./weatherfiles -a 2013/12

3. You can get daily stats for a given month which include
   a) graphical representation of daily max temp
   b) graphical representation of daily min temp

   To get this data, run the following command

   node index.js <folderPath> -c <year>/<month>
   e.g:
   node index.js ./weatherfiles -c 2013/12

NOTE:
You can run multiple tasks together like

    node index.js <folderPath> <command1> <argument1> <command2> <argument2>
    e.g
    node index.js ./weatherfiles -a 2004/06 -e 2011 -c 2013/12 -a 2011/05
