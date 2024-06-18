import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  recipe: any;
  setRecipe: React.Dispatch<React.SetStateAction<any>>;
  capitalizeFirstLetter: (string: string) => string;
};

const RecipeContext = createContext<null | StateContextType>(null);

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function RecipeProvider({ children }: any) {
  const [recipe, setRecipe] = useState(null);

  return (
    <RecipeContext.Provider
      value={{ recipe, setRecipe, capitalizeFirstLetter }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
