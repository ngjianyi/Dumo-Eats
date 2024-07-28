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
