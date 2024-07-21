import { useContext } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { RecipeContext } from "../../../RecipeProvider";
import { SIZES, COLORS } from "@/constants/Theme";

export default function IngredientsFilter() {
  const {
    includeIngredients,
    setIncludeIngredients,
    excludeIngredients,
    setExcludeIngredients,
  } = useContext<any>(RecipeContext);

  return (
    <View style={styles.searchContainer}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.titleText}>Ingredients to include:</Text>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={includeIngredients}
            onChangeText={(text) => setIncludeIngredients(text)}
            placeholder="Separate ingredients with a space"
            autoCapitalize="none"
            placeholderTextColor={COLORS.gray}
            aria-label="includeIngredientsInput"
          />
        </View>

        <Text style={styles.titleText}>Ingredients to exclude:</Text>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={excludeIngredients}
            onChangeText={(text) => setExcludeIngredients(text)}
            placeholder="Separate ingredients with a space"
            autoCapitalize="none"
            placeholderTextColor={COLORS.gray}
            aria-label="excludeIngredientsInput"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
