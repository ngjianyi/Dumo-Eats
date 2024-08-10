import { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RecipeContext } from "../../../RecipeProvider";
import { SIZES, COLORS } from "@/constants/Theme";

export default function IntolerancesFilter() {
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

  const { intolerances, setIntolerances } = useContext<any>(RecipeContext);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.allergyContainer}>
        <Text style={styles.titleText}>Allergens</Text>

        <FlatList
          data={intolerancesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                ...styles.tab,
                borderColor: intolerances.includes(item)
                  ? "black"
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
                  color: intolerances.includes(item) ? "black" : COLORS.gray2,
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
  tab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    margin: SIZES.xSmall / 2,
    flex: 1 / 2,
  },
  tabText: {
    color: "#444262",
    textAlign: "center",
  },
  allergyContainer: {
    width: "70%",
    alignSelf: "center",
  },
});
