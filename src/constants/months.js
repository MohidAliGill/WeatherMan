const months = [
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

getMonthNameToNumber = (name) => {
  return months.indexOf(name) + 1;
};

getMonthNumberToName = (num) => {
  return months[num - 1];
};

export { getMonthNameToNumber, getMonthNumberToName };
