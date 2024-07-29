import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import { RecipeContext } from "../../RecipeProvider";
import { SIZES, COLORS } from "@/constants/Theme";

export default function CuisineTabs() {
  const { cuisineType, setCuisineType } = useContext<any>(RecipeContext);
  const cuisineTypes = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  return (
    <View style={styles.tabsContainer}>
      <FlatList
        data={cuisineTypes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              ...styles.tab,
              borderColor:
                item === cuisineType ? COLORS.secondary : COLORS.gray2,
            }}
            onPress={() => {
              item === cuisineType ? setCuisineType("") : setCuisineType(item);
            }}
          >
            <Text
              style={{
                ...styles.tabText,
                color: item === cuisineType ? COLORS.secondary : COLORS.gray2,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={cuisineTypes.length}
        windowSize={cuisineTypes.length}
        aria-label="cuisineTabs"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    width: "100%",
    marginTop: 16,
    padding: 3,
  },
  tab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    marginHorizontal: SIZES.xSmall / 2,
  },
  tabText: {
    color: "#444262",
  },
});
