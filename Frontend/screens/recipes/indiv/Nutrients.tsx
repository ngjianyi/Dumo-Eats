import { FlatList, View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import capitaliseFirstLetter from "@/utils/functions/Capitalise";
import { Recipe } from "@/utils/recipes/RecipesTypes";

type Props = {
  recipe: Recipe;
};

export default function Nutrients({ recipe }: Props) {
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
    borderRadius: SIZES.medium,
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
    marginLeft: SIZES.small,
  },
});
