import { useContext } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { RecipeContext } from "../../../RecipeProvider";
import { SIZES, COLORS } from "@/constants/Theme";

export default function CaloriesFilter() {
  const { minCalories, setMinCalories, maxCalories, setMaxCalories } =
    useContext<any>(RecipeContext);

  return (
    <View style={{ flexDirection: "column" }}>
      <Text style={styles.titleText}>Calories</Text>

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

        <View style={styles.middleWrapper}>
          <Text style={styles.middleText}>to</Text>
        </View>

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
  titleText: {
    paddingTop: SIZES.large,
    paddingBottom: SIZES.xSmall / 2,
    textAlign: "center",
    fontSize: SIZES.medium,
    color: "black",
  },
  middleWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  middleText: { color: "black" },
  searchWrapper: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: SIZES.xxLarge,
  },
  searchInput: {
    paddingHorizontal: SIZES.medium,
  },
});
