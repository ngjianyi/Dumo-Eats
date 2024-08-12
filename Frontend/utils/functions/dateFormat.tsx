/**
 * Function that changes the format of each date in array from month day, year
 * to day month.
 * @param dates An array of strings representing the previous 7 days
 * in the format July 24, 2024
 * @returns An array of string presenting the previous 7 date in the
 * format 24 July
 */

export function dateFormat(dates: string[]): string[] {
  const res: string[] = [];
  for (let i = 0; i < dates.length; i++) {
    const tempArray: string[] = dates[i].split(",")[0].split(" ");
    const day: string = tempArray[1];
    const month: string = tempArray[0];
    const newDate: string = `${day} ${month}`;
    res.push(newDate);
  }
  return res;
}
