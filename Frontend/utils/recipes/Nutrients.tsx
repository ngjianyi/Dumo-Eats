import { Nutrient } from "./RecipesTypes";

const macros: Set<string> = new Set([
  "carbohydrates",
  "net carbohydrates",
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

const separateNutrients = (
  nutrients: Nutrient[]
): { name: string; nutrients: Nutrient[] }[] => {
  const macros: Nutrient[] = [];
  const minerals: Nutrient[] = [];
  const vitamins: Nutrient[] = [];
  const others: Nutrient[] = [];

  for (let i = 0; i < nutrients.length; i++) {
    const nutrient: Nutrient = nutrients[i];
    const name = nutrient.name.toLowerCase();
    if (isMacro(name)) {
      macros.push(nutrient);
    } else if (isMineral(name)) {
      minerals.push(nutrient);
    } else if (isVitamin(name)) {
      vitamins.push(nutrient);
    } else {
      others.push(nutrient);
    }
  }

  return [
    {
      name: "Macronutrients",
      nutrients: macros,
    },
    {
      name: "Minerals",
      nutrients: minerals,
    },
    {
      name: "Vitamins",
      nutrients: vitamins,
    },
    {
      name: "Others",
      nutrients: others,
    },
  ];
};

export default separateNutrients;
