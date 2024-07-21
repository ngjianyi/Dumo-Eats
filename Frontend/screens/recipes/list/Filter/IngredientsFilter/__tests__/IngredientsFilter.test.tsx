import React from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import IngredientsFilter from "../IngredientsFilter";
import {
  RecipeContextType,
  RecipeProvider,
} from "@/screens/recipes/RecipeProvider";

interface ProviderProps {
  value: RecipeContextType;
}

const renderWithContext = (
  ui: React.ReactElement,
  {
    providerProps,
    ...renderOptions
  }: { providerProps: ProviderProps } & RenderOptions
) => {
  return render(
    <RecipeProvider {...providerProps}>{ui}</RecipeProvider>,
    renderOptions
  );
};

describe("Renders ingredients filters correctly", () => {
  it("Renders include ingredients title", () => {
    const { getByText } = renderWithContext(<IngredientsFilter />, {
      providerProps: {
        value: {
          query: "",
          setQuery: jest.fn(),
          cuisineType: "",
          setCuisineType: jest.fn(),
          minCalories: 0,
          setMinCalories: jest.fn(),
          maxCalories: 0,
          setMaxCalories: jest.fn(),
          includeIngredients: "",
          setIncludeIngredients: jest.fn(),
          excludeIngredients: "",
          setExcludeIngredients: jest.fn(),
          intolerances: [],
          setIntolerances: jest.fn(),
        },
      },
    });

    expect(getByText("Ingredients to include:")).toBeTruthy();
  });

  it("Renders include ingredients input box", () => {
    const { getByLabelText } = renderWithContext(<IngredientsFilter />, {
      providerProps: {
        value: {
          query: "",
          setQuery: jest.fn(),
          cuisineType: "",
          setCuisineType: jest.fn(),
          minCalories: 0,
          setMinCalories: jest.fn(),
          maxCalories: 0,
          setMaxCalories: jest.fn(),
          includeIngredients: "",
          setIncludeIngredients: jest.fn(),
          excludeIngredients: "",
          setExcludeIngredients: jest.fn(),
          intolerances: [],
          setIntolerances: jest.fn(),
        },
      },
    });

    const includeIngredientsInput = getByLabelText("includeIngredientsInput");
    expect(includeIngredientsInput).toBeTruthy();
    expect(includeIngredientsInput.props.placeholder).toBe(
      "Separate ingredients with a space"
    );
  });

  it("Renders exclude ingredients title", () => {
    const { getByText } = renderWithContext(<IngredientsFilter />, {
      providerProps: {
        value: {
          query: "",
          setQuery: jest.fn(),
          cuisineType: "",
          setCuisineType: jest.fn(),
          minCalories: 0,
          setMinCalories: jest.fn(),
          maxCalories: 0,
          setMaxCalories: jest.fn(),
          includeIngredients: "",
          setIncludeIngredients: jest.fn(),
          excludeIngredients: "",
          setExcludeIngredients: jest.fn(),
          intolerances: [],
          setIntolerances: jest.fn(),
        },
      },
    });

    expect(getByText("Ingredients to exclude:")).toBeTruthy();
  });

  it("Renders exclude ingredients input box", () => {
    const { getByLabelText } = renderWithContext(<IngredientsFilter />, {
      providerProps: {
        value: {
          query: "",
          setQuery: jest.fn(),
          cuisineType: "",
          setCuisineType: jest.fn(),
          minCalories: 0,
          setMinCalories: jest.fn(),
          maxCalories: 0,
          setMaxCalories: jest.fn(),
          includeIngredients: "",
          setIncludeIngredients: jest.fn(),
          excludeIngredients: "",
          setExcludeIngredients: jest.fn(),
          intolerances: [],
          setIntolerances: jest.fn(),
        },
      },
    });

    const excludeIngredientsInput = getByLabelText("excludeIngredientsInput");
    expect(excludeIngredientsInput).toBeTruthy();
    expect(excludeIngredientsInput.props.placeholder).toBe(
      "Separate ingredients with a space"
    );
  });
});
