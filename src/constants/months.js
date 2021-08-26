let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function name2num(name) {
  return months.indexOf(name) + 1;
}

function num2name(num) {
  return months[num - 1];
}

export { name2num, num2name };
