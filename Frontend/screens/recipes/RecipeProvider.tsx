import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  cuisineType: string;
  setCuisineType: React.Dispatch<React.SetStateAction<string>>;
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

function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<string>("");
  const [cuisineType, setCuisineType] = useState<string>("");
  const [minCalories, setMinCalories] = useState<number>(50);
  const [maxCalories, setMaxCalories] = useState<number>(800);
  const [includeIngredients, setIncludeIngredients] = useState<string>("");
  const [excludeIngredients, setExcludeIngredients] = useState<string>("");
  const [intolerances, setIntolerances] = useState<string[]>([]);

  return (
    <RecipeContext.Provider
      value={{
        query,
        setQuery,
        cuisineType,
        setCuisineType,
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
