import moment from "moment";
/**
 * Function to retrieve the dates of the past 7 days to create calorie graph
 * @returns An array of length 7 containig the dates of the previous 7 days
 * in the format July 24, 2024
 */
export function Dates() {
  const datesArray: string[] = [];
  for (let i = 6; i >= 0; i--) {
    datesArray.push(moment().subtract(i, "days").format("LL"));
  }
  return datesArray;
}
