import { NutrientType } from "./RecipesTypes";

const macros: Set<string> = new Set([
  "carbohydrates",
  "net carbohydrates",
  "sugar",
  "protein",
  "fat",
  "saturated fat",
  "cholesterol",
  "fiber",
]);

const minerals: Set<string> = new Set([
  "sodium",
  "manganese",
  "potassium",
  "phosphorus",
  "iron",
  "copper",
  "magnesium",
  "zinc",
  "selenium",
  "calcium",
]);

const vitamins: Set<string> = new Set([
  "vitamin a",
  "vitamin b1",
  "vitamin b2",
  "vitamin b3",
  "vitamin b5",
  "vitamin b6",
  "vitamin b7",
  "vitamin b9",
  "folate", // Vitamin B9
  "vitamin b12",
  "vitamin c",
  "vitamin d",
  "vitamin e",
  "vitamin k",
]);

const isMacro = (name: string): boolean => {
  return macros.has(name);
};

const isMineral = (name: string): boolean => {
  return minerals.has(name);
};

const isVitamin = (name: string): boolean => {
  return vitamins.has(name);
};

const compare = (a: NutrientType, b: NutrientType) => {
  return a.name > b.name ? 1 : -1;
};

const separateNutrients = (
  nutrients: NutrientType[]
): { name: string; nutrients: NutrientType[] }[] => {
  const macros: NutrientType[] = [];
  const minerals: NutrientType[] = [];
  const vitamins: NutrientType[] = [];
  const others: NutrientType[] = [];

  for (let i = 0; i < nutrients.length; i++) {
    const nutrient: NutrientType = nutrients[i];
    const name = nutrient.name.toLowerCase();
    if (name === "calories") {
      continue;
    }

    if (isMacro(name)) {
      macros.push(nutrient);
    } else if (isMineral(name)) {
      minerals.push(nutrient);
    } else if (isVitamin(name)) {
      if (name === "folate") {
        vitamins.push({
          name: "Vitamin B9", // Rename folate to vitamin B9 for easier reference
          amount: nutrient.amount,
          unit: nutrient.unit,
          percentOfDailyNeeds: nutrient.percentOfDailyNeeds,
        });
      } else {
        vitamins.push(nutrient);
      }
    } else {
      others.push(nutrient);
    }
  }

  return [
    {
      name: "Macronutrients",
      nutrients: macros.sort(compare),
    },
    {
      name: "Minerals",
      nutrients: minerals.sort(compare),
    },
    {
      name: "Vitamins",
      nutrients: vitamins.sort(compare),
    },
    {
      name: "Others",
      nutrients: others.sort(compare),
    },
  ];
};

export default separateNutrients;
