import { checkStreak } from "@/screens/Home/CalorieTracker/UpdateCaloriesScreen";

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

