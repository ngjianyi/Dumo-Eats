import React from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import IntolerancesFilter from "../IntolerancesFilter";
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

const intolerancesList = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

describe("Renders intolerances filters correctly", () => {
  it("Renders intolerances filter title", () => {
    const { getByText } = renderWithContext(<IntolerancesFilter />, {
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

    expect(getByText("Allergens:")).toBeTruthy();
  });

  it("Renders flatlist items correctly", () => {
    const { getByText } = renderWithContext(<IntolerancesFilter />, {
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

    intolerancesList.forEach((item) => {
      expect(getByText(item)).toBeTruthy();
    });
  });
});
