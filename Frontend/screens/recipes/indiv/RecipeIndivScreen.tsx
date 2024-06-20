import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import { RecipeContext } from "../RecipeProvider";
import Tabs from "./Tabs";
import Recipe from "./Recipe";
import { COLORS, SIZES } from "@/constants/Theme";
import Nutrients from "./Nutrients";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

export default function IndivScreen() {
  const { recipe } = useContext<any>(RecipeContext);

  const tabs = ["Nutrition", "Ingredients", "Instructions"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Nutrition":
        return <Nutrients />;

      case "Ingredients":
        return <Ingredients />;

      case "Instructions":
        return <Instructions />;

      default:
        return <Text>Something went wrong</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
              <Recipe
                recipeImage={recipe.image}
                recipeTitle={recipe.title}
                recipeCalories={recipe.nutrition.nutrients[0].amount}
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
  },
});
