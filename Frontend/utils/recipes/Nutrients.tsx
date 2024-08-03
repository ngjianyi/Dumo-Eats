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

export { isMacro, isMineral, isVitamin };
