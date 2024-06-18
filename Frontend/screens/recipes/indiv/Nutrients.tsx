import { useContext } from "react";
import { RecipeContext } from "../RecipeProvider";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "@/constants/Theme";

type nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type Props = {
  nutrients: nutrient[];
  capitalizeFirstLetter: (string: string) => string;
};

export default function Nutrients() {
  const { recipe, setRecipe, capitalizeFirstLetter } =
    useContext<any>(RecipeContext);

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        {recipe?.nutrition.nutrients.map((nutrient: nutrient) => (
          <View style={styles.pointWrapper} key={nutrient.name}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>
              {capitalizeFirstLetter(nutrient.name)}: {nutrient.amount}
              {nutrient.unit} ({nutrient.percentOfDailyNeeds}% of daily needs)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
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
    fontFamily: FONT.regular,
    marginLeft: SIZES.small,
  },
});
