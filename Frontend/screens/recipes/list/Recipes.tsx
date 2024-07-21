import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { Recipe } from "@/utils/recipes/RecipesTypes";
import RecipeDisplay from "./RecipeDisplay";

type Props = {
  recipes: Recipe[] | null;
  getRecipes: () => void;
};

export default function Recipes({ recipes, getRecipes }: Props) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
