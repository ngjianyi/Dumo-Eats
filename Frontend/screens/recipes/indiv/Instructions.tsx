import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "@/constants/Theme";

type step = {
  equipment: {
    id: number;
    image: string;
    name: string;
    temperature: {
      number: number;
      unit: string;
    };
    length: {
      number: number;
      unit: string;
    };
  }[];
  ingredients: {
    id: number;
    image: string;
    name: string;
  }[];
  number: number;
  step: string;
};

type item = {
  name: string;
  steps: step[];
};

type Props = {
  items: item[];
  capitalizeFirstLetter: (string: string) => string;
};

export default function Instructions({ items, capitalizeFirstLetter }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        {items?.map((item) => (
          <View key={item.name}>
            <View>{item.name}</View>
            {item?.steps?.map((step: step) => (
              <View style={styles.pointWrapper} key={item.name + step.number}>
                <View style={styles.pointDot} />
                <Text style={styles.pointText}>
                  {step.number}. {capitalizeFirstLetter(step.step)}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  pointsContainer: {
    marginVertical: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: SIZES.small / 1.25,
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
    fontFamily: FONT.regular,
    marginLeft: SIZES.small,
  },
  btn: {
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    borderRadius: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  btnText: {
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
  },
});
