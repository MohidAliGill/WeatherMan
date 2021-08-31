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

/**
 * Converts the name of month to its number
 * @param {string} name - Name of the month for which the index is required
 * @returns {number} index of the month
 */
let getMonthIndex = (name) => {
  return months.indexOf(name) + 1;
};

/**
 * Converts the number of month to its name
 * @param {number} num - Number of month for which the name is required
 * @returns {string} name of the month
 */
let getMonthName = (num) => {
  return months[num - 1];
};

export { getMonthName, getMonthIndex };
