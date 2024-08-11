import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import { RecipeType, NutrientType } from "@/utils/recipes/RecipesTypes";
import separateNutrients from "@/utils/recipes/Nutrients";
import NutrientSection from "./NutrientSection";

type Props = {
  recipe: RecipeType;
};

export default function Nutrients({ recipe }: Props) {
  const nutrients: NutrientType[] = recipe.nutrition.nutrients;
  const separatedNutrients = separateNutrients(nutrients);

  return (
    <View style={styles.container}>
      <NutrientSection nutrientSections={separatedNutrients} />
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
    marginVertical: SIZES.small,
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
    color: COLORS.gray,
    marginLeft: SIZES.small,
  },
});
