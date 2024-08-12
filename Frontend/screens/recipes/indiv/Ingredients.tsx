import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import capitaliseFirstLetter from "@/utils/functions/Capitalise/Capitalise";
import { RecipeType, IngredientType } from "@/utils/recipes/RecipesTypes";

type Props = {
  recipe: RecipeType;
};

export default function ({ recipe }: Props) {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  /**
   * Filters duplicate ingredients
   */
  const getFilteredIngredients = () => {
    setIngredients([
      ...new Map(
        recipe.nutrition.ingredients.map((obj) => [
          `${obj.id}:${obj.name}`,
          obj,
        ])
      ).values(),
    ]);
  };

  useEffect(getFilteredIngredients, []);

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <FlatList
          data={ingredients}
          renderItem={({ item }) => (
            <View style={styles.pointWrapper} key={item.id}>
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>
                {capitaliseFirstLetter(item.name)}: {item.amount} {item.unit}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium,
    flex: 1,
  },
  pointsContainer: {
    flex: 1,
  },
  pointWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: SIZES.small / 1.25,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
  pointText: {
    fontSize: SIZES.medium - 2,
    color: "black",
    marginLeft: SIZES.small,
  },
});
