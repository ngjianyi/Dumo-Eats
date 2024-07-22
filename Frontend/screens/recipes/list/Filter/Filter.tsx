import { Text, StyleSheet } from "react-native";
import CaloriesFilter from "./CaloriesFilter/CaloriesFilter";
import IngredientsFilter from "./IngredientsFilter/IngredientsFilter";
import IntolerancesFilter from "./IntolerancesFilter/IntolerancesFilter";
import { SIZES, COLORS } from "@/constants/Theme";

export default function Filter() {
  return (
    <>
      <Text style={styles.welcomeMessage}>Filters</Text>

      <CaloriesFilter />

      <IngredientsFilter />

      <IntolerancesFilter />
    </>
  );
}

const styles = StyleSheet.create({
  welcomeMessage: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    textAlign: "center",
  },
});
