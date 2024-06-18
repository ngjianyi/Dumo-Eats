import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import { RecipeContext } from "../RecipeProvider";
import Tabs from "./Tabs";
import Recipe from "./Recipe";
import { COLORS, SIZES } from "@/constants/Theme";
import Nutrients from "./Nutrients";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// const Tab = createBottomTabNavigator();

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default function IndivScreen() {
  const { recipe, setRecipe } = useContext<any>(RecipeContext);

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

  // const displayTabContent = () => {
  //   switch (activeTab) {
  //     case "Nutrition":
  //       return (
  //         <Nutrients
  //           nutrients={recipe.nutrition.nutrients}
  //           capitalizeFirstLetter={capitalizeFirstLetter}
  //         />
  //       );

  //     case "Ingredients":
  //       return (
  //         <Ingredients
  //           ingredients={recipe.nutrition.ingredients}
  //           capitalizeFirstLetter={capitalizeFirstLetter}
  //         />
  //       );

  //     case "Instructions":
  //       return (
  //         <Instructions
  //           items={recipe.analyzedInstructions}
  //           capitalizeFirstLetter={capitalizeFirstLetter}
  //         />
  //       );

  //     default:
  //       return <Text>Something went wrong</Text>;
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      {
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
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
              <Tab.Navigator>
                <Tab.Screen name="Nutrition" component={Nutrients} />
                <Tab.Screen name="Ingredients" component={Ingredients} />
                <Tab.Screen name="Instructions" component={Instructions} />
              </Tab.Navigator>

              {/* {displayTabContent()} */}
            </View>
          </SafeAreaView>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    padding: SIZES.medium,
    paddingBottom: SIZES.xSmall,
  },
});
