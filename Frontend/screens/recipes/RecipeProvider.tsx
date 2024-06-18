import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  recipe: any;
  setRecipe: React.Dispatch<React.SetStateAction<any>>;
};

const RecipeContext = createContext<null | StateContextType>(null);

function RecipeProvider({ children }: any) {
  const [id, setId] = useState(0);
  const [recipe, setRecipe] = useState(null);

  return (
    <RecipeContext.Provider value={{ id, setId, recipe, setRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
