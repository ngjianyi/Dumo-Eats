import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import { StyleSheet } from "react-native";

type Props = {
  recipeImage: string;
  recipeTitle: string;
  recipeCalories: number;
};

const RecipeHeader = ({ recipeImage, recipeTitle, recipeCalories }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image src={recipeImage} style={styles.logoImage} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.recipeTitle}>{recipeTitle}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.caloriesBox}>
          <Text style={styles.calories}>Calories: {recipeCalories}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "80%",
    height: "80%",
  },
  titleContainer: {
    marginTop: SIZES.small,
  },
  recipeTitle: {
    fontSize: SIZES.large,
    color: "black",
    textAlign: "center",
  },
  details: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  caloriesBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  calories: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
  },
});

export default RecipeHeader;
