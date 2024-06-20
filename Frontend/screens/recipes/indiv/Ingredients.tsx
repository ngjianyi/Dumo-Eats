import { useContext } from "react";
import { RecipeContext } from "../RecipeProvider";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "@/constants/Theme";

type ingredient = {
  amount: number;
  unit: string;
  image: string;
  name: string;
};

type Props = {
  ingredients: ingredient[];
  capitalizeFirstLetter: (string: string) => string;
};

export default function () {
  const { recipe, capitalizeFirstLetter } = useContext<any>(RecipeContext);

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        {recipe?.nutrition.ingredients.map((ingredient: ingredient) => (
          <View style={styles.pointWrapper} key={ingredient.name}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>
              {capitalizeFirstLetter(ingredient.name)}: {ingredient.amount}{" "}
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
