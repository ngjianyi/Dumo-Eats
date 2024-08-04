import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import { Recipe, Nutrient } from "@/utils/recipes/RecipesTypes";
import separateNutrients from "@/utils/recipes/Nutrients";
import NutrientSection from "./NutrientSection";

type Props = {
  recipe: Recipe;
};

export default function Nutrients({ recipe }: Props) {
  const nutrients: Nutrient[] = recipe.nutrition.nutrients;
  const separatedNutrients = separateNutrients(nutrients);

  return (
    <View style={styles.container}>
      {/* <View style={styles.pointsContainer}>
        <FlatList
          data={recipe?.nutrition.nutrients}
          renderItem={({ item }) => {
            return (
              <View style={styles.pointWrapper} key={item.name}>
                <View style={styles.pointDot} />
                <Text style={styles.pointText}>
                  {capitaliseFirstLetter(item.name)}: {item.amount}
                  {item.unit} ({item.percentOfDailyNeeds}% of daily needs)
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View> */}

      <NutrientSection nutrientSections={separatedNutrients} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
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
