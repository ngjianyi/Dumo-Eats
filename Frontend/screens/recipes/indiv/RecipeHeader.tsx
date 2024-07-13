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
      <View style={styles.logoBox}>
        <Image src={recipeImage} style={styles.logoImage} />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.recipeTitle}>{recipeTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <View style={styles.locationBox}>
          <Text style={styles.locationName}>Calories: {recipeCalories}</Text>
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
  logoBox: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
  },
  logoImage: {
    width: "80%",
    height: "80%",
  },
  jobTitleBox: {
    marginTop: SIZES.small,
  },
  recipeTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    // fontFamily: FONT.bold,
    textAlign: "center",
  },
  companyInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    // fontFamily: FONT.regular,
    marginLeft: 2,
  },
});

export default RecipeHeader;