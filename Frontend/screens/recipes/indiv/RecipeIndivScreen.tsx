import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { RecipeContext } from "../RecipeProvider";
import Tabs from "./Tabs";
import RecipeHeader from "./RecipeHeader";
import { COLORS, SIZES } from "@/constants/Theme";
import { Recipe } from "@/utils/recipes/RecipesTypes";
import Nutrients from "./Nutrients";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  recipe: Recipe;
};

export default function RecipeIndivScreen({
  setDetailsVisible,
  recipe,
}: Props) {
  const tabs = ["Nutrition", "Ingredients", "Instructions"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Nutrition":
        return <Nutrients recipe={recipe} />;

      case "Ingredients":
        return <Ingredients recipe={recipe} />;

      case "Instructions":
        return <Instructions recipe={recipe} />;

      default:
        return <Text>Something went wrong</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => setDetailsVisible(false)}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={25} color="black" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <RecipeHeader
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
  backButton: {
    padding: SIZES.xSmall,
  },
  header: {
    padding: SIZES.medium,
  },
});
