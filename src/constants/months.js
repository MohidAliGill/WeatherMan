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

let getMonthIndex = (name) => {
  return months.indexOf(name) + 1;
};

let getMonthName = (num) => {
  return months[num - 1];
};

export { getMonthName, getMonthIndex };
