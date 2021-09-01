<<<<<<< HEAD
This assignment can perform three tasks for you which are as follows:

1. You can get the yearly stats which include

   - Date and temperature of the day with max temp in the year
   - Date and temperature of the day with min temp in the year
   - Date and humidity of the day with max humidity in the year

   To get this data, run the following command

```
   node index.js <folderPath> -e <year>
   e.g:
   node index.js ./weatherfiles -e 2013
```

2. You can get monthly stats which include

   - Average max temp of the month
   - Average min temp of the month
   - Average mean humidity of the month

   To get this data, run the following command

```
   node index.js <folderPath> -a <year>/<month>
   e.g:
   node index.js ./weatherfiles -a 2013/12
```

3. You can get daily stats for a given month which include

   - Graphical representation of daily max temp
   - Graphical representation of daily min temp

   To get this data, run the following command

```
   node index.js <folderPath> -c <year>/<month>
   e.g:
   node index.js ./weatherfiles -c 2013/12
```

NOTE:
You can run multiple tasks together like

    node index.js <folderPath> <command1> <argument1> <command2> <argument2>
    e.g
    node index.js ./weatherfiles -a 2004/06 -e 2011 -c 2013/12 -a 2011/05
=======
the-lab
=======
The purpose of this repo is to help the team lead and his team member in training and evaluating newly hired developers especially fresh grads. Code written by newbies for training/practice will be checked in here and reviewed by their respective team leads. All feedback must be in written on gitlab.

## Getting Started

1. Fork this repository for every new trainee.
2. Go to the <em>Settings > General > Visibility, project features, permissions</em> and set the **Project Visibility** to **Private**.
3. Change the repository name in <em>Settings > General</em> to <em>{Team Name} - {Trainee Name} e.g. Edited - Ali Sufian.</em>
4. Add the required contributors from the <em>Members Setting.</em>
5. For every assigned task create a new branch e.g. alisufian-Weatherman.
6. When the task is complete make sure the code confirms to [ES6](http://es6-features.org) and [airbnb](https://github.com/airbnb/javascript).
7. Push the code and create a pull request against your *master* branch.
8. Specify the title of the PR as *task* e.g. *Weatherman* so its easy to find in the list.

Do not add log files, temp files, data files etc.
**Good Luck**.
>>>>>>> 6b9fad5de945dfa91d46288242dc1bd7cfc9e410
