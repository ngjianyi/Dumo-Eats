const checkDate = (val: string) => {
    const array = val.split("/")
    if (array.length != 3) {
      return false
    } else if (Number(array[0]) > 31 || Number(array[1]) > 12 || Number(array[2]) > 2024) {
      return false
    } else {
      return true
    }
  }

const dateInputs = [
    { date: "31/1/2020",res: true },
    { date: "29/10/2002",res: true },
    { date: "31/1/2025",res: false },
    { date: "35/1/2000",res: false },
    { date: "2/15/2000",res: false },
    { date: "abcdefgh",res: false },
    { date: "123456",res: false },
    { date: "12/3456",res: false },
    { date: "00/0/0", res: false},
]

describe("Valid Date Input", () => {
    test("checkDate with one valid date input should be equal to true", () => 
    {
        for (let i = 0; i < dateInputs.length; i++) {
            const result = checkDate(dateInputs[i].date);
            expect(result).toBe(dateInputs[i].res);
        }
    });
});   