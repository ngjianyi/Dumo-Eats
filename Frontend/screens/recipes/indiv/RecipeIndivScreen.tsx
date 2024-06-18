import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { RecipeContext } from "../RecipeProvider";
import Tabs from "./Tabs";
import Recipe from "./Recipe";
import { COLORS, SIZES } from "@/constants/Theme";
import Nutrients from "./Nutrients";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

export default function IndivScreen() {
  const { recipe, setRecipe } = useContext<any>(RecipeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const displayTabContent = () => {
    switch (activeTab) {
      case "Nutrition":
        return (
          <Nutrients
            nutrients={recipe.nutrition.nutrients}
            capitalizeFirstLetter={capitalizeFirstLetter}
          />
        );

      case "Ingredients":
        return (
          <Ingredients
            ingredients={recipe.nutrition.ingredients}
            capitalizeFirstLetter={capitalizeFirstLetter}
          />
        );

      case "Instructions":
        return (
          <Instructions
            items={recipe.analyzedInstructions}
            capitalizeFirstLetter={capitalizeFirstLetter}
          />
        );

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
        <ScrollView showsVerticalScrollIndicator={false}>
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
