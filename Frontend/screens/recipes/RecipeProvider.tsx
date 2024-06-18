import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  recipe: any;
  setRecipe: React.Dispatch<React.SetStateAction<any>>;
};

const RecipeContext = createContext<null | StateContextType>(null);

function RecipeProvider({ children }: any) {
  const [recipe, setRecipe] = useState(null);

  return (
    <RecipeContext.Provider value={{ recipe, setRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
