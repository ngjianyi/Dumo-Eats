import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useContext, useState } from "react";
import { RecipeContext } from "@/screens/recipes/RecipeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, SIZES, SHADOWS } from "@/constants/Theme";
import SocialTabs from "@/components/social/SocialTab";

export default function RecipeDisplay({ navigation, item }: any) {
  const { setRecipe } = useContext<any>(RecipeContext);

  const handlePress = (item: any) => {
    setRecipe(item);
    navigation.navigate("indiv");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <Text style={styles.jobName} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>

        <Text style={styles.jobType}>
          {/* First nutrient is calorie */}
          Calories: {Math.ceil(item.nutrition.nutrients[0].amount)}
        </Text>
        <SocialTabs heart={true} saved={true} />
      </View>

      <TouchableOpacity style={styles.logoContainer}>
        <Image src={item.image} resizeMode="contain" style={styles.logImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
  },
  list: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    marginVertical: SIZES.xSmall / 4,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
});
