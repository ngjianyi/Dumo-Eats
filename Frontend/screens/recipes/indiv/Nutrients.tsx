import { FlatList, View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import capitaliseFirstLetter from "@/utils/functions/Capitalise/Capitalise";
import { Recipe, Nutrient } from "@/utils/recipes/RecipesTypes";
import { isMacro, isMineral, isVitamin } from "@/utils/recipes/Nutrients";

type Props = {
  recipe: Recipe;
};

export default function Nutrients({ recipe }: Props) {
  const nutrients: Nutrient[] = recipe.nutrition.nutrients;
  const macros: Nutrient[] = [];
  const minerals: Nutrient[] = [];
  const vitamins: Nutrient[] = [];
  const others: Nutrient[] = [];

  for (let i = 0; i < nutrients.length; i++) {
    const nutrient: Nutrient = nutrients[i];
    const name = nutrient.name.toLowerCase();
    if (isMacro(name)) {
      macros.push(nutrient);
    } else if (isMineral(name)) {
      minerals.push(nutrient);
    } else if (isVitamin(name)) {
      vitamins.push(nutrient);
    } else {
      others.push(nutrient);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
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
      </View>
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
