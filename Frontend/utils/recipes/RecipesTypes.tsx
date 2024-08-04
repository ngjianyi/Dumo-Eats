type RecipeType = {
  id: number;
  title: string;
  image: string;
  nutrition: {
    nutrients: NutrientType[];
    ingredients: IngredientType[];
  };
  analyzedInstructions: InstructionType[];
};

type NutrientType = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type IngredientType = {
  id: number;
  amount: number;
  unit: string;
  image: string;
  name: string;
};

type InstructionType = {
  name: string;
  steps: StepType[];
};

type StepType = {
  ingredients: {
    id: number;
    image: string;
    name: string;
  }[];
  number: number;
  step: string;
};

export { RecipeType, NutrientType, IngredientType, InstructionType, StepType };
