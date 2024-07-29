import { Nutrient } from "./RecipesTypes";
import { getUserDocSnap } from "../social/User";

export default async function DailyAllowance(nutrients: Nutrient[]) {
  const user = await getUserDocSnap();
  const calorieGoal = user.data()?.calorieGoal;
  const caloriesLeft = user.data()?.calorieGoal - user.data()?.currentCalorie;
  const gender = user.data()?.gender;
  const age = user.data()?.DOB.split("/").pop() - new Date().getFullYear();
  const currBenefits: string[] = [];
  const currWarnings: string[] = [];

  for (let i = 0; i < nutrients.length; i++) {
    if (nutrients[i].name === "Calories") {
      if (
        nutrients[i].amount > calorieGoal / 3 ||
        nutrients[i].amount > caloriesLeft
      ) {
        currWarnings.push("calories");
      }
    } else if (nutrients[i].name === "Saturated Fat") {
      if (gender === "male") {
        if (nutrients[i].amount > 15) {
          currWarnings.push("saturated fat");
        }
      } else if (gender === "female") {
        if (nutrients[i].amount > 10) {
          currWarnings.push("saturated fat");
        }
      }
    } else if (nutrients[i].name === "Sugar") {
      if (nutrients[i].amount > 50) {
        currWarnings.push("sugar");
      }
    } else if (nutrients[i].name === "Cholesterol") {
      if (nutrients[i].amount > 150) {
        currWarnings.push("cholesterol");
      }
    } else if (nutrients[i].name === "Sodium") {
      if (nutrients[i].amount > 1000) {
        currWarnings.push("sodium");
      }
    } else if (nutrients[i].name === "Iron") {
      if (age < 12) {
        if (nutrients[i].amount > 7 / 2) {
          currBenefits.push("iron");
        }
      } else if (age < 16) {
        if (gender === "male") {
          if (nutrients[i].amount > 12 / 2) {
            currBenefits.push("iron");
          }
        } else if (gender === "female") {
          if (nutrients[i].amount > 18 / 2) {
            currBenefits.push("iron");
          }
        }
      } else if (age < 19) {
        if (gender === "male") {
          if (nutrients[i].amount > 6 / 2) {
            currBenefits.push("iron");
          }
        } else if (gender === "female") {
          if (nutrients[i].amount > 19 / 2) {
            currBenefits.push("iron");
          }
        }
      } else if (age < 61) {
        if (gender === "male") {
          if (nutrients[i].amount > 8 / 2) {
            currBenefits.push("iron");
          }
        } else if (gender === "female") {
          if (nutrients[i].amount > 18 / 2) {
            currBenefits.push("iron");
          }
        }
      } else {
        if (nutrients[i].amount > 8 / 2) {
          currBenefits.push("iron");
        }
      }
    } else if (nutrients[i].name === "Vitamin A") {
      if (age < 1) {
        if (nutrients[i].amount > 300 / 2) {
          currBenefits.push("vitamin A");
        }
      } else if (age < 3) {
        if (nutrients[i].amount > 250 / 2) {
          currBenefits.push("vitamin A");
        }
      } else if (age < 7) {
        if (nutrients[i].amount > 300 / 2) {
          currBenefits.push("vitamin A");
        }
      } else if (age < 10) {
        if (nutrients[i].amount > 400 / 2) {
          currBenefits.push("vitamin A");
        }
      } else if (age < 12) {
        if (nutrients[i].amount > 575 / 2) {
          currBenefits.push("vitamin A");
        }
      } else if (age < 16) {
        if (nutrients[i].amount > 725 / 2) {
          currBenefits.push("vitamin A");
        }
      } else if (age < 19) {
        if (nutrients[i].amount > 750 / 2) {
          currBenefits.push("vitamin A");
        }
      } else {
        if (nutrients[i].amount > 750 / 2) {
          currBenefits.push("vitamin A");
        }
      }
    } else if (nutrients[i].name === "Vitamin B6") {
      if (age < 1) {
        if (nutrients[i].amount > 0.2 / 2) {
          currBenefits.push("vitamin B6");
        }
      } else if (age < 3) {
        if (nutrients[i].amount > 0.5 / 2) {
          currBenefits.push("vitamin B6");
        }
      } else if (age < 7) {
        if (nutrients[i].amount > 0.6 / 2) {
          currBenefits.push("vitamin B6");
        }
      } else if (age < 13) {
        if (nutrients[i].amount > 1.0 / 2) {
          currBenefits.push("vitamin B6");
        }
      } else if (age < 19) {
        if (gender === "male") {
          if (nutrients[i].amount > 1.4 / 2) {
            currBenefits.push("vitamin B6");
          }
        } else if (gender === "female") {
          if (nutrients[i].amount > 1.2 / 2) {
            currBenefits.push("vitamin B6");
          }
        }
      } else if (age < 51) {
        if (nutrients[i].amount > 1.3 / 2) {
          currBenefits.push("vitamin B6");
        }
      } else {
        if (gender === "male") {
          if (nutrients[i].amount > 1.7 / 2) {
            currBenefits.push("vitamin B6");
          }
        } else if (gender === "female") {
          if (nutrients[i].amount > 1.5 / 2) {
            currBenefits.push("vitamin B6");
          }
        }
      }
    } else if (nutrients[i].name === "Vitamin B12") {
      if (age < 1) {
        if (nutrients[i].amount > 0.5 / 2) {
          currBenefits.push("vitamin B12");
        }
      } else if (age < 3) {
        if (nutrients[i].amount > 0.9 / 2) {
          currBenefits.push("vitamin B12");
        }
      } else if (age < 7) {
        if (nutrients[i].amount > 1.1 / 2) {
          currBenefits.push("vitamin B12");
        }
      } else if (age < 13) {
        if (nutrients[i].amount > 1.8 / 2) {
          currBenefits.push("vitamin B12");
        }
      } else if (age < 19) {
        if (gender === "male") {
          if (nutrients[i].amount > 2.4 / 2) {
            currBenefits.push("vitamin B12");
          }
        } else if (gender === "female") {
          if (nutrients[i].amount > 2.2 / 2) {
            currBenefits.push("vitamin B12");
          }
        }
      } else {
        if (nutrients[i].amount > 2.4 / 2) {
          currBenefits.push("vitamin B12");
        }
      }
    } else if (nutrients[i].name === "Calcium") {
      if (age < 1) {
        if (nutrients[i].amount > 400 / 2) {
          currBenefits.push("calcium");
        }
      } else if (age < 4) {
        if (nutrients[i].amount > 500 / 2) {
          currBenefits.push("calcium");
        }
      } else if (age < 7) {
        if (nutrients[i].amount > 600 / 2) {
          currBenefits.push("calcium");
        }
      } else if (age < 10) {
        if (nutrients[i].amount > 700 / 2) {
          currBenefits.push("calcium");
        }
      } else if (age < 19) {
        if (nutrients[i].amount > 1000 / 2) {
          currBenefits.push("calcium");
        }
      } else if (age < 51) {
        if (nutrients[i].amount > 800 / 2) {
          currBenefits.push("calcium");
        }
      } else {
        if (nutrients[i].amount > 1000 / 2) {
          currBenefits.push("calcium");
        }
      }
    }
  }

  return [currBenefits, currWarnings];
}
