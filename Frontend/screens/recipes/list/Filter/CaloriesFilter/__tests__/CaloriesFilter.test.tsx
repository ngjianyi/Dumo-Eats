// import React from "react";
// import { render, RenderOptions } from "@testing-library/react-native";
// import CaloriesFilter from "../CaloriesFilter";
// import {
//   RecipeContextType,
//   RecipeProvider,
// } from "@/screens/recipes/RecipeProvider";

// interface ProviderProps {
//   value: RecipeContextType;
// }

// const renderWithContext = (
//   ui: React.ReactElement,
//   {
//     providerProps,
//     ...renderOptions
//   }: { providerProps: ProviderProps } & RenderOptions
// ) => {
//   return render(
//     <RecipeProvider {...providerProps}>{ui}</RecipeProvider>,
//     renderOptions
//   );
// };

// describe("Renders calorie filters correctly", () => {
//   it("should render calories filter title", () => {
//     const { getByText } = renderWithContext(<CaloriesFilter />, {
//       providerProps: {
//         value: {
//           query: "",
//           setQuery: jest.fn(),
//           cuisineType: "",
//           setCuisineType: jest.fn(),
//           minCalories: 0,
//           setMinCalories: jest.fn(),
//           maxCalories: 0,
//           setMaxCalories: jest.fn(),
//           includeIngredients: "",
//           setIncludeIngredients: jest.fn(),
//           excludeIngredients: "",
//           setExcludeIngredients: jest.fn(),
//           intolerances: [],
//           setIntolerances: jest.fn(),
//         },
//       },
//     });

//     expect(getByText("Calories:")).toBeTruthy();
//   });

//   it("should render minimum calorie input box", () => {
//     const { getByLabelText } = renderWithContext(<CaloriesFilter />, {
//       providerProps: {
//         value: {
//           query: "",
//           setQuery: jest.fn(),
//           cuisineType: "",
//           setCuisineType: jest.fn(),
//           minCalories: 0,
//           setMinCalories: jest.fn(),
//           maxCalories: 0,
//           setMaxCalories: jest.fn(),
//           includeIngredients: "",
//           setIncludeIngredients: jest.fn(),
//           excludeIngredients: "",
//           setExcludeIngredients: jest.fn(),
//           intolerances: [],
//           setIntolerances: jest.fn(),
//         },
//       },
//     });

//     const minCaloriesInput = getByLabelText("minCaloriesInput");
//     expect(minCaloriesInput).toBeTruthy();
//     expect(minCaloriesInput.props.placeholder).toBe("Min");
//   });

//   it("should render calories filter word in between inputs", () => {
//     const { getByText } = renderWithContext(<CaloriesFilter />, {
//       providerProps: {
//         value: {
//           query: "",
//           setQuery: jest.fn(),
//           cuisineType: "",
//           setCuisineType: jest.fn(),
//           minCalories: 0,
//           setMinCalories: jest.fn(),
//           maxCalories: 0,
//           setMaxCalories: jest.fn(),
//           includeIngredients: "",
//           setIncludeIngredients: jest.fn(),
//           excludeIngredients: "",
//           setExcludeIngredients: jest.fn(),
//           intolerances: [],
//           setIntolerances: jest.fn(),
//         },
//       },
//     });

//     expect(getByText("to")).toBeTruthy();
//   });

//   it("should render maximum calorie input box", () => {
//     const { getByLabelText } = renderWithContext(<CaloriesFilter />, {
//       providerProps: {
//         value: {
//           query: "",
//           setQuery: jest.fn(),
//           cuisineType: "",
//           setCuisineType: jest.fn(),
//           minCalories: 0,
//           setMinCalories: jest.fn(),
//           maxCalories: 0,
//           setMaxCalories: jest.fn(),
//           includeIngredients: "",
//           setIncludeIngredients: jest.fn(),
//           excludeIngredients: "",
//           setExcludeIngredients: jest.fn(),
//           intolerances: [],
//           setIntolerances: jest.fn(),
//         },
//       },
//     });

//     const maxCaloriesInput = getByLabelText("maxCaloriesInput");
//     expect(maxCaloriesInput).toBeTruthy();
//     expect(maxCaloriesInput.props.placeholder).toBe("Max");
//   });
// });
