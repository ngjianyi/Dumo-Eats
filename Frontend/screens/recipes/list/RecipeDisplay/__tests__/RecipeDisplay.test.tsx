import React from "react";
import { render } from "@testing-library/react-native";
import RecipeDisplay from "../RecipeDisplay";
import { Recipe } from "@/utils/recipes/RecipesTypes";

const item: Recipe = {
  id: 0,
  title: "Test title",
  image: "",
  nutrition: {
    nutrients: [
      { name: "Calorie", amount: 500, unit: "", percentOfDailyNeeds: 20 },
    ],
    ingredients: [
      {
        id: 1,
        amount: 5,
        unit: "g",
        image: "",
        name: "Ingredient in ingredients",
      },
    ],
  },
  analyzedInstructions: [
    {
      name: "",
      steps: [
        {
          ingredients: [
            {
              id: 2,
              image: "",
              name: "Ingredient in instruction",
            },
          ],
          number: 1,
          step: "Step 1",
        },
      ],
    },
  ],
};

describe("Renders recipe box correctly", () => {
  it("should render title and calories correctly", () => {
    const { getByText } = render(<RecipeDisplay item={item} />, {});

    expect(getByText("Test title")).toBeTruthy();
    expect(getByText("Calories: 500")).toBeTruthy();
  });
});
