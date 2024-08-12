import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { NutrientType } from "@/utils/recipes/RecipesTypes";
import { COLORS, SIZES } from "@/constants/Theme";

interface Props {
  nutrientSections: {
    name: string;
    nutrients: NutrientType[];
  }[];
}

export default function NutrientSection({ nutrientSections }: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([0]);

  return (
    <Accordion
      sections={nutrientSections}
      activeSections={activeSections}
      renderHeader={(section) => {
        return (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{section.name}</Text>
          </View>
        );
      }}
      renderContent={(section) => {
        return (
          <FlatList
            data={section.nutrients}
            renderItem={({ item }) => {
              return (
                <View style={styles.pointWrapper} key={item.name}>
                  <View style={styles.pointDot} />

                  <Text style={styles.pointText}>
                    <Text style={styles.name}>{item.name}</Text>
                    {": "}
                    {item.amount}
                    {item.unit} {item.percentOfDailyNeeds}
                    {"% of daily needs"}
                  </Text>
                </View>
              );
            }}
          />
        );
      }}
      onChange={(activeSections) => {
        setActiveSections(activeSections);
      }}
      underlayColor={COLORS.gray2}
      renderAsFlatList={true}
      expandMultiple={true}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: SIZES.xSmall / 2,
  },
  title: {
    fontSize: SIZES.large,
    textAlign: "center",
    color: "black",
  },
  name: {
    color: "black",
  },
  pointWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: SIZES.small / 1.25,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
  pointText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    marginLeft: SIZES.small,
  },
});
