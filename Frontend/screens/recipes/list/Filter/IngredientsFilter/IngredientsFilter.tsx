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
    <View style={{ flexDirection: "column" }}>
      <Text style={styles.titleText}>Ingredients</Text>

      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={includeIngredients}
          onChangeText={(text) => setIncludeIngredients(text)}
          placeholder="To include"
          autoCapitalize="none"
          placeholderTextColor={COLORS.gray}
          aria-label="includeIngredientsInput"
        />
      </View>

      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={excludeIngredients}
          onChangeText={(text) => setExcludeIngredients(text)}
          placeholder="To exclude"
          autoCapitalize="none"
          placeholderTextColor={COLORS.gray}
          aria-label="excludeIngredientsInput"
        />
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
    color: COLORS.secondary,
  },
  searchWrapper: {
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: SIZES.xxLarge,
    marginVertical: SIZES.xSmall / 2,
  },
  searchInput: {
    paddingHorizontal: SIZES.medium,
  },
});
