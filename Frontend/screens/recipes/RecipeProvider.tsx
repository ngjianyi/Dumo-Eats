import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  recipe: any;
  setRecipe: React.Dispatch<React.SetStateAction<any>>;
  capitalizeFirstLetter: (string: string) => string;
  minCalories: number;
  setMinCalories: React.Dispatch<React.SetStateAction<number>>;
  maxCalories: number;
  setMaxCalories: React.Dispatch<React.SetStateAction<number>>;
  includeIngredients: string;
  setIncludeIngredients: React.Dispatch<React.SetStateAction<string>>;
  excludeIngredients: string;
  setExcludeIngredients: React.Dispatch<React.SetStateAction<string>>;
  intolerances: string[];
  setIntolerances: React.Dispatch<React.SetStateAction<string[]>>;
};

const RecipeContext = createContext<null | StateContextType>(null);

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function RecipeProvider({ children }: any) {
  const [recipe, setRecipe] = useState(null);
  const [minCalories, setMinCalories] = useState<number>(50);
  const [maxCalories, setMaxCalories] = useState<number>(800);
  const [includeIngredients, setIncludeIngredients] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [intolerances, setIntolerances] = useState<string[]>([]);

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        setRecipe,
        capitalizeFirstLetter,
        minCalories,
        setMinCalories,
        maxCalories,
        setMaxCalories,
        includeIngredients,
        setIncludeIngredients,
        excludeIngredients,
        setExcludeIngredients,
        intolerances,
        setIntolerances,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
