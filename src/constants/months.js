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

function convertMonthNameToNumber(name) {
  return months.indexOf(name) + 1;
}

function convertMonthNumberToName(num) {
  return months[num - 1];
}

export { convertMonthNameToNumber, convertMonthNumberToName };
