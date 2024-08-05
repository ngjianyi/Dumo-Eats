import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Tabs from "../../../components/tabs/Tabs";
import RecipeHeader from "./RecipeHeader";
import { COLORS, SIZES } from "@/constants/Theme";
import { RecipeType } from "@/utils/recipes/RecipesTypes";
import Nutrients from "./Nutrients";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  recipe: RecipeType;
};

export default function RecipeIndivScreen({
  setDetailsVisible,
  recipe,
}: Props) {
  const tabs = ["Nutrition", "Ingredients", "Instructions"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => setDetailsVisible(false)}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={25} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <RecipeHeader
          recipeImage={recipe.image}
          recipeTitle={recipe.title}
          recipeCalories={recipe.nutrition.nutrients[0].amount}
        />

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
      <View style={styles.tabs}>
        {activeTab === "Nutrition" ? (
          <Nutrients recipe={recipe} />
        ) : activeTab === "Ingredients" ? (
          <Ingredients recipe={recipe} />
        ) : activeTab === "Instructions" ? (
          <Instructions recipe={recipe} />
        ) : (
          <Text>Something went wrong</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: SIZES.xSmall,
  },
  header: {
    paddingHorizontal: SIZES.medium,
  },
  tabs: {
    flex: 1,
  },
});
