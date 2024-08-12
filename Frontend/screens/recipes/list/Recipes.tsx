import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { RecipeType } from "@/utils/recipes/RecipesTypes";
import RecipeDisplay from "./RecipeDisplay/RecipeDisplay";

type Props = {
  recipes: RecipeType[] | null;
  getRecipes: () => void;
};

export default function Recipes({ recipes, getRecipes }: Props) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /**
   * Function to call when refreshing flatlist
   */
  const onRefresh = () => {
    setRefreshing(true);
    getRecipes();
    setRefreshing(false);
  };

  return (
    <View style={styles.list}>
      {recipes && (
        <FlatList
          data={recipes}
          renderItem={({ item }) => {
            return <RecipeDisplay item={item} />;
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
