import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import capitaliseFirstLetter from "@/utils/functions/Capitalise";
import { Recipe } from "@/utils/recipes/RecipesTypes";

type Props = {
  recipe: Recipe;
};

export default function ({ recipe }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        {recipe?.nutrition.ingredients.map((ingredient) => (
          <View style={styles.pointWrapper} key={ingredient.name}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>
              {capitaliseFirstLetter(ingredient.name)}: {ingredient.amount}{" "}
              {ingredient.unit}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    // fontFamily: FONT.bold,
  },
  pointsContainer: {
    marginVertical: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: SIZES.small / 1.25,
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
    color: COLORS.gray,
    // fontFamily: FONT.regular,
    marginLeft: SIZES.small,
  },
});
