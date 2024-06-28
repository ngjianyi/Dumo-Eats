import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  capitalizeFirstLetter: (string: string) => string;
  recipes: any;
  setRecipes: React.Dispatch<React.SetStateAction<any>>;
  recipe: any;
  setRecipe: React.Dispatch<React.SetStateAction<any>>;
  minCalories: number;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
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
  const [recipes, setRecipes] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [query, setQuery] = useState<string>("");
  const [minCalories, setMinCalories] = useState<number>(50);
  const [maxCalories, setMaxCalories] = useState<number>(800);
  const [includeIngredients, setIncludeIngredients] = useState<string>("");
  const [excludeIngredients, setExcludeIngredients] = useState<string>("");
  const [intolerances, setIntolerances] = useState<string[]>([]);

  return (
    <RecipeContext.Provider
      value={{
        capitalizeFirstLetter,
        recipes,
        setRecipes,
        recipe,
        setRecipe,
        query,
        setQuery,
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
