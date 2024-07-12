import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useContext, useState } from "react";
import { RecipeContext } from "@/screens/recipes/RecipeProvider";
import RecipeDisplay from "./RecipeDisplay";

export default function Recipe({ getRecipes, navigation }: any) {
  const { recipes } = useContext<any>(RecipeContext);
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
          return <RecipeDisplay navigation={navigation} item={item} />;
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
