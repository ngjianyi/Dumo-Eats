type Recipe = {
  title: string;
  image: string;
  nutrition: {
    nutrients: Nutrient[];
    ingredients: Ingredient[];
  };
  analyzedInstructions: Instruction[];
};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type Ingredient = {
  amount: number;
  unit: string;
  image: string;
  name: string;
};

type Instruction = {
  name: string;
  steps: Step[];
};

type Step = {
  ingredients: {
    id: number;
    image: string;
    name: string;
  }[];
  number: number;
  step: string;
};

export { Recipe, Nutrient, Ingredient, Instruction, Step };
