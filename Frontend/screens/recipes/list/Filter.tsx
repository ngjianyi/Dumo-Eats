import { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RecipeContext } from "../RecipeProvider";
import { SIZES, COLORS, SHADOWS } from "@/constants/Theme";

const intolerancesList = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

export default function Filter() {
  const {
    minCalories,
    setMinCalories,
    maxCalories,
    setMaxCalories,
    includeIngredients,
    setIncludeIngredients,
    excludeIngredients,
    setExcludeIngredients,
    intolerances,
    setIntolerances,
  } = useContext<any>(RecipeContext);

  return (
    <>
      <Text style={styles.welcomeMessage}>Filters</Text>
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
            />
          </View>
        </View>
      </View>

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
            />
          </View>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.allergyContainer}>
          <Text style={styles.allergy}>Allergens:</Text>
          <FlatList
            data={intolerancesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  ...styles.tab,
                  borderColor: intolerances.includes(item)
                    ? COLORS.secondary
                    : COLORS.gray2,
                }}
                onPress={() => {
                  setIntolerances((prev: string[]) =>
                    prev.includes(item)
                      ? prev.filter((i) => i !== item)
                      : [...prev, item]
                  );
                }}
              >
                <Text
                  style={{
                    ...styles.tabText,
                    color: intolerances.includes(item)
                      ? COLORS.secondary
                      : COLORS.gray2,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    margin: SIZES.xSmall / 2,
    flex: 1 / 2,
  },
  tabText: {
    // fontFamily: FONT.medium,
    color: "#444262",
    textAlign: "center",
  },
  calorie: {
    paddingTop: SIZES.xSmall / 2,
  },
  allergyContainer: {
    width: "70%",
    alignSelf: "center",
  },
  allergy: {
    // fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    textAlign: "center",
    paddingVertical: SIZES.small,
  },
  welcomeMessage: {
    // fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    textAlign: "center",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginTop: SIZES.large,
    height: 150,
    margin: SIZES.xSmall / 2,
    padding: SIZES.xSmall / 2,
  },
  searchWrapper: {
    // flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: 30,
  },
  titleText: {
    // marginHorizontal: SIZES.small,
    padding: SIZES.small,
    textAlign: "center",
  },
  searchInput: {
    // fontFamily: FONT.regular,
    // width: "100%",
    // height: "100%",
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
