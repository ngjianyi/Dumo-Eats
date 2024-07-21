import { Text, StyleSheet, ActivityIndicator, View } from "react-native";
import React, { useState, useEffect } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import axios, { AxiosError } from "axios";
import { getUserDocSnap } from "@/utils/social/User";
import { Recipe } from "@/utils/recipes/RecipesTypes";
import Recipes from "@/screens/recipes/list/Recipes";
import { SIZES } from "@/constants/Theme";

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalRecipes, setTotalRecipes] = useState<number>(1);

  const getRecipes = async () => {
    const userDocSnap = await getUserDocSnap();
    var recipeIds = [];
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      recipeIds = userData.savedRecipes.map(
        (ref: DocumentReference<DocumentData, DocumentData>) => ref.id
      );
    } else {
      console.log("Error has occured when getting user data for saved recipes");
      setError(true);
      return;
    }

    setIsLoading(true);
    const KEY = "429fc2334b13424f9ab79a250d6d4a3c";
    const URL = "https://api.spoonacular.com/recipes/informationBulk";
    await axios
      .get(URL, {
        params: {
          apiKey: KEY,
          ids: recipeIds.toString(),
          includeNutrition: true,
        },
      })
      .then((response) => {
        // console.log("Response:", response.data);
        setRecipes(response.data);
        setTotalRecipes(recipeIds.length);
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
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.activity} size="large" />
      ) : error ? (
        <Text style={styles.error}>Something went wrong</Text>
      ) : totalRecipes == 0 ? (
        <Text style={styles.error}>No results</Text>
      ) : (
        <Recipes recipes={recipes} getRecipes={getRecipes} />
      )}
    </View>
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
