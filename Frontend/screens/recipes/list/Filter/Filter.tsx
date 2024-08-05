import { View, StyleSheet } from "react-native";
import CaloriesFilter from "./CaloriesFilter/CaloriesFilter";
import IngredientsFilter from "./IngredientsFilter/IngredientsFilter";
import IntolerancesFilter from "./IntolerancesFilter/IntolerancesFilter";
import { SIZES, COLORS } from "@/constants/Theme";

export default function Filter() {
  return (
    <>
      <View style={styles.searchContainer}>
        <CaloriesFilter />

        <IngredientsFilter />

        <IntolerancesFilter />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.xSmall / 2,
  },
});
