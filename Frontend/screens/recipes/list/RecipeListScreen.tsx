import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import { RecipeContext } from "../RecipeProvider";
import Recipes from "@/screens/recipes/list/Recipes";
import Header from "./Header";
import CuisineTabs from "./CuisineTabs";
import { SIZES } from "@/constants/Theme";

export default function RecipeListScreen({ navigation }: any) {
  const {
    query,
    cuisineType,
    minCalories,
    maxCalories,
    includeIngredients,
    excludeIngredients,
    intolerances,
  } = useContext<any>(RecipeContext);

  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);

  const getRecipes = async () => {
    setIsLoading(true);
    const KEY = "429fc2334b13424f9ab79a250d6d4a3c";
    const URL = `https://api.spoonacular.com/recipes/complexSearch`;
    await axios
      .get(URL, {
        params: {
          apiKey: KEY,
          query: query,
          cuisine: cuisineType,
          instructionsRequired: true,
          addRecipeNutrition: true,
          addRecipeInstructions: true,
          minCalories: minCalories ? minCalories : 50,
          maxCalories: maxCalories ? maxCalories : 800,
          intolerances: intolerances.toString(),
          includeIngredients: includeIngredients.split(" ").toString(),
          excludeIngredients: excludeIngredients.split(" ").toString(),
          number: 2,
        },
      })
      .then((response) => {
        // console.log("Response:", response.data);
        setTotalRecipes(response.data.totalResults);
        setRecipes(response.data.results);
        setIsLoading(false);
        setError(false);
      })
      .catch((error: Error | AxiosError) => {
        console.error("Error:", error);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [cuisineType]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Header handleClick={getRecipes} navigation={navigation} />

          <CuisineTabs />
        </View>
      </TouchableWithoutFeedback>

      {isLoading ? (
        <ActivityIndicator style={styles.activity} size="large" />
      ) : error ? (
        <Text style={styles.error}>Something went wrong</Text>
      ) : totalRecipes == 0 ? (
        <Text style={styles.error}>No results</Text>
      ) : (
        <Recipes recipes={recipes} getRecipes={getRecipes} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SIZES.xSmall / 2,
  },
  activity: {
    paddingTop: 20,
  },
  error: {
    // fontFamily: FONT.bold,
    textAlign: "center",
    margin: SIZES.xLarge,
  },
});
