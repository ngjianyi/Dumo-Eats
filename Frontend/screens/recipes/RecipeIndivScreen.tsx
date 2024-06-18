import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { RecipeContext } from "./RecipeProvider";
import axios, { AxiosError } from "axios";
import Tabs from "./indiv/Tabs";
import Recipe from "./indiv/Recipe";
import { COLORS, SIZES } from "@/constants/Theme";
import Nutrients from "./indiv/Nutrients";
import Ingredients from "./indiv/Ingredients";
import Instructions from "./indiv/Instructions";

export default function IndivScreen() {
  const { id, setId } = useContext<any>(RecipeContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<any>(null);

  const [refreshing, setRefreshing] = useState(false);

  const tabs = ["Nutrition", "Ingredients", "Instructions"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const nutrientsIndex = {
    calories: 0,
    fat: 1,
    saturatedFat: 2,
    carbohydrate: 3,
    netCarbohydrate: 4,
    sugar: 5,
    cholesterol: 6,
    sodium: 7,
    protein: 8,
  };

  const getRecipe = async () => {
    setIsLoading(true);
    const KEY: string = "429fc2334b13424f9ab79a250d6d4a3c";
    const URL: string = `https://api.spoonacular.com/recipes/${id}/information`;
    setIsLoading(true);
    await axios
      .get(URL, {
        params: {
          apiKey: KEY,
          includeNutrition: true,
        },
      })
      .then((response) => {
        console.log("Indiv recipe:", response.data);
        setRecipe(response.data);
        console.log(response.data.nutrition.ingredients);
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
    getRecipe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getRecipe();
    setRefreshing(false);
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Nutrition":
        return <Nutrients nutrients={recipe.nutrition.nutrients} />;

      case "Ingredients":
        return <Ingredients ingredients={recipe.nutrition.ingredients} />;

      case "Instructions":
        return <Instructions items={recipe.analyzedInstructions} />;

      default:
        return <Text>Something went wrong?</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Recipe
                recipeImage={recipe.image}
                recipeTitle={recipe.title}
                recipeCalories={
                  recipe.nutrition.nutrients[nutrientsIndex.calories].amount
                }
              />

              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    flex: 1,
  },

  searchHeader: {
    backgroundColor: "lightskyblue",
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 14,
    alignItems: "center",
  },

  subHeader: {
    width: "85%",
  },

  input: {
    padding: 10,
    fontSize: 16,
  },

  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 20,
  },

  headerButtons: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  slider: {
    justifyContent: "center",
  },

  cameraView: {
    marginLeft: "30%",
  },

  camera: {
    backgroundColor: "white",
    borderRadius: 160,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainer: {
    width: "100%",
    marginTop: 16,
    padding: 3,
  },
  tab: {
    paddingVertical: 12 / 2,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444262",
  },
  tabText: {
    fontFamily: "DMMedium",
    color: "#444262",
  },

  recipeItem: {
    flex: 1,
    backgroundColor: "coral",
    marginVertical: 5,
    borderRadius: 20,
    marginHorizontal: 14,
    justifyContent: "center",
  },

  content: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    marginLeft: 30,
    justifyContent: "space-between",
  },

  image: {
    backgroundColor: "white",
    marginRight: "10%",
  },

  name: {
    fontSize: 25,
    fontStyle: "italic",
    color: "teal",
    marginLeft: 0,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  healthy: {
    borderRadius: 20,
    backgroundColor: "lightgreen",
    padding: 10,
  },
  unhealthy: {
    borderRadius: 20,
    backgroundColor: "red",
    padding: 7,
  },
});
