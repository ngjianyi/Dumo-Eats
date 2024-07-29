import moment from "moment";
export function Dates() {
  const datesArray: string[] = [];
  const currDate: string = moment().format("LL"); // July 24, 2024
  for (let i = 6; i >= 0; i--) {
    datesArray.push(moment().subtract(i, "days").format("LL"));
  }
  return datesArray;
}
