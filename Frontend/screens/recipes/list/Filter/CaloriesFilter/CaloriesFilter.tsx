import { useContext } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { RecipeContext } from "../../../RecipeProvider";
import { SIZES, COLORS } from "@/constants/Theme";

export default function CaloriesFilter() {
  const { minCalories, setMinCalories, maxCalories, setMaxCalories } =
    useContext<any>(RecipeContext);

  return (
    <View style={{ flexDirection: "column" }}>
      <Text style={styles.titleText}>Calories:</Text>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={minCalories}
            onChangeText={(text) => setMinCalories(text)}
            placeholder="Min"
            keyboardType="numeric"
            maxLength={4}
            placeholderTextColor={COLORS.gray}
            aria-label="minCaloriesInput"
          />
        </View>

        <Text style={styles.calorie}>to</Text>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={maxCalories}
            onChangeText={(text) => setMaxCalories(text)}
            placeholder="Max"
            keyboardType="numeric"
            maxLength={4}
            placeholderTextColor={COLORS.gray}
            aria-label="maxCaloriesInput"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calorie: {
    paddingTop: SIZES.xSmall / 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 150,
    margin: SIZES.xSmall / 2,
    padding: SIZES.xSmall / 2,
  },
  searchWrapper: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: 30,
  },
  titleText: {
    padding: SIZES.small,
    textAlign: "center",
  },
  searchInput: {
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
});
