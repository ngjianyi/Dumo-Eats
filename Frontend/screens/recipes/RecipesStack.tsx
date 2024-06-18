import React from "react";
import RecipeIndivScreen from "./indiv/RecipeIndivScreen";
import RecipeListScreen from "./RecipeListScreen";
import { RecipeProvider } from "./RecipeProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function RecipesStack() {
  return (
    <RecipeProvider>
      <Stack.Navigator initialRouteName="list">
        <Stack.Screen
          name="list"
          component={RecipeListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="indiv" component={RecipeIndivScreen} />
      </Stack.Navigator>
    </RecipeProvider>
  );
}
