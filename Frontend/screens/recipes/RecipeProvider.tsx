import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type StateContextType = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  cuisineType: string;
  setCuisineType: Dispatch<SetStateAction<string>>;
  minCalories: number;
  setMinCalories: Dispatch<SetStateAction<number>>;
  maxCalories: number;
  setMaxCalories: Dispatch<SetStateAction<number>>;
  includeIngredients: string;
  setIncludeIngredients: Dispatch<SetStateAction<string>>;
  excludeIngredients: string;
  setExcludeIngredients: Dispatch<SetStateAction<string>>;
  intolerances: string[];
  setIntolerances: Dispatch<SetStateAction<string[]>>;
};

const RecipeContext = createContext<null | StateContextType>(null);

function RecipeProvider({ children }: { children: ReactNode }) {
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
