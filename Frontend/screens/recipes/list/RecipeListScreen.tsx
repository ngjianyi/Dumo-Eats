import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import { RecipeContext } from "../RecipeProvider";
import Recipes from "@/screens/recipes/list/Recipes";
import { SIZES, COLORS } from "@/constants/Theme";
import Header from "./Header";

export default function RecipeListScreen({ navigation }: any) {
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

  const {
    recipe,
    setRecipe,
    capitalizeFirstLetter,
    minCalories,
    setMinCalories,
    maxCalories,
    setMaxCalories,
    includeIngredients,
    setIncludeIngredients,
    excludeIngredients,
    setExcludeIngredients,
    intolerances,
    setIntolerances,
  } = useContext<any>(RecipeContext);

  const [cuisineType, setCuisineType] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any>(null);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);

  const getRecipes = async () => {
    setIsLoading(true);
    const KEY = "429fc2334b13424f9ab79a250d6d4a3c";
    const URL = `https://api.spoonacular.com/recipes/complexSearch`;
    setIsLoading(true);
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
          number: 5,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
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
          <Header
            query={query}
            setQuery={setQuery}
            handleClick={getRecipes}
            navigation={navigation}
          />

          <View style={styles.tabsContainer}>
            <FlatList
              data={cuisineTypes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    ...styles.tab,
                    borderColor:
                      item === cuisineType ? COLORS.secondary : COLORS.gray2,
                  }}
                  onPress={() => {
                    item === cuisineType
                      ? setCuisineType("")
                      : setCuisineType(item);
                  }}
                >
                  <Text
                    style={{
                      ...styles.tabText,
                      color:
                        item === cuisineType ? COLORS.secondary : COLORS.gray2,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {isLoading ? (
        <ActivityIndicator style={styles.activity} size="large" />
      ) : error ? (
        <Text style={styles.error}>Something went wrong</Text>
      ) : totalRecipes > 0 ? (
        <Recipes
          recipes={recipes}
          navigation={navigation}
          getRecipes={getRecipes}
        />
      ) : (
        <Text style={styles.error}>No results</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SIZES.xSmall / 2,
  },
  tabsContainer: {
    width: "100%",
    marginTop: 16,
    padding: 3,
  },
  activity: {
    paddingTop: 20,
  },
  tab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    marginHorizontal: SIZES.xSmall / 2,
  },
  tabText: {
    // fontFamily: FONT.medium,
    color: "#444262",
  },
  error: {
    // fontFamily: FONT.bold,
    textAlign: "center",
    margin: SIZES.xLarge,
  },
});
