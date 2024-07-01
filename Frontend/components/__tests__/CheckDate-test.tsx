const checkStreak =  (prev: string, curr: string) : boolean => {
    const array1 = prev.split("/")
    const array2 = curr.split("/")
    const month1 = Number(array1[0])
    const month2 = Number(array2[0])
    const day1 = Number(array1[1])
    const day2 = Number(array2[1])
    const year1 = Number(array1[2])
    const year2 = Number(array2[2])

    const thirty = [4,6,9,11]
    if (year1 != year2 ) {
        return false
    //same month
    } else if (month1 == month2 && day2 > day1) {
        return day2 - day1 == 1
        //end of 30 days month
    } else if (thirty.includes(month1) && day1 == 30) {
        return day2 == 1 && month2 - month1 == 1
        //end of feb
    } else if (month1 == 2 && day1 == 28) {
        return day2 == 1 && month2 - month1 == 1
        //end of year
    } else if (month1 == 12 && day1 == 31){
        return day2 == 1 && month2 == 1
        //end of 31 days month
    } else if (day1 == 31){
        return day2 == 1 && month2 - month1 == 1
    } else {
        return false
    }
    // 6/26/2024

} 

const dates = [
    { previous: "3/26/2024", current:"3/27/2024", res: true },
    { previous: "3/27/2024", current:"3/27/2024", res: false },
    { previous: "2/26/2024", current:"3/27/2024", res: false},
    { previous: "2/28/2024", current:"3/1/2024", res: true},
    { previous: "3/31/2024", current:"4/1/2024", res: true},
    { previous: "4/30/2024", current:"1/5/2024", res: false},
    { previous: "4/30/2024", current:"5/1/2024", res: true},
    { previous: "4/30/2024", current:"5/1/2025", res: false},
]

describe("Streak", () => {
    test("checkStreak with two consecutive dates should be equal to true", () => {
      for (let i = 0; i < dates.length; i++) {
        const result = checkStreak(dates[i].previous, dates[i].current);
        expect(result).toBe(dates[i].res);
      }
    });
  });   

