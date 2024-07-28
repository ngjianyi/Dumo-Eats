import React from "react";
import {
  render,
  RenderOptions,
  fireEvent,
} from "@testing-library/react-native";
import CuisineTabs from "../CuisineTabs";
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

const cuisineTypes = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

describe("Renders cuisine tabs correctly", () => {
  it("should render flatlist items correctly", () => {
    const { getByLabelText, getByText } = renderWithContext(<CuisineTabs />, {
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

    const flatList = getByLabelText("cuisineTabs");
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: {
          x: 500,
        },
        contentSize: {
          width: 1000,
        },
        layoutMeasurement: {
          width: 500,
        },
      },
    });

    cuisineTypes.forEach((item) => {
      expect(getByText(item)).toBeTruthy();
    });
  });
});
