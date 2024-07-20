import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import RecipeDisplay from "./RecipeDisplay";

export default function Recipes({ recipes, getRecipes, navigation }: any) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    getRecipes();
    setRefreshing(false);
  };

  return (
    <View style={styles.list}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
