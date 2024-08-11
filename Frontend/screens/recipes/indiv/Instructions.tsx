import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, SafeAreaView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { RecipeType } from "@/utils/recipes/RecipesTypes";
import { COLORS, SIZES } from "@/constants/Theme";

type Props = {
  recipe: RecipeType;
};

export default function Instructions({ recipe }: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([0]);

  if (recipe.analyzedInstructions.length == 1) {
    return (
      <View style={styles.container}>
        <View style={styles.pointsContainer}>
          <FlatList
            data={recipe.analyzedInstructions}
            renderItem={({ item, index }) => {
              return (
                <View key={index}>
                  <Text style={styles.header}>{item.name}</Text>

                  <FlatList
                    data={item.steps}
                    renderItem={({ item }) => (
                      <View
                        style={styles.pointWrapper}
                        key={index.toString() + item.number}
                      >
                        <View style={styles.pointDot} />
                        <Text style={styles.pointText}>
                          <Text style={styles.step}>
                            {"Step "}
                            {item.number}{" "}
                          </Text>

                          {item.step}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <Accordion
          sections={recipe.analyzedInstructions}
          activeSections={activeSections}
          renderHeader={(section) => {
            return <Text style={styles.title}>{section.name}</Text>;
          }}
          renderContent={(section) => (
            <FlatList
              data={section.steps}
              renderItem={({ item }) => (
                <View style={styles.pointWrapper} key={item.number}>
                  <View style={styles.pointDot} />
                  <Text style={styles.pointText}>
                    <Text style={styles.step}>
                      {"Step "}
                      {item.number}{" "}
                    </Text>

                    {item.step}
                  </Text>
                </View>
              )}
            />
          )}
          onChange={(activeSections) => {
            setActiveSections(activeSections);
          }}
          underlayColor={COLORS.gray2}
          renderAsFlatList={true}
          expandMultiple={true}
          containerStyle={{
            backgroundColor: "#FFF",
            paddingHorizontal: SIZES.medium,
          }}
          sectionContainerStyle={{ marginVertical: SIZES.small }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium,
    flex: 1,
  },
  header: { color: "black" },
  step: {
    color: "black",
  },
  pointsContainer: {
    flex: 1,
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
  title: {
    fontSize: SIZES.medium,
    color: "black",
  },
});
