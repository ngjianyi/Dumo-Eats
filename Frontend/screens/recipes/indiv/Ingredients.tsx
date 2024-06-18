import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "@/constants/Theme";

type ingredient = {
  //   amount: {
  //     metric: {
  //       unit: string;
  //       value: number;
  //     };
  //     us: { unit: string; value: number };
  //   };
  amount: number;
  unit: string;
  image: string;
  name: string;
};

type Props = {
  ingredients: ingredient[];
};

export default function ({ ingredients }: Props) {
  const [unit, setUnit] = useState("metric");

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          unit === "metric" ? setUnit("us") : setUnit("metric");
        }}
      >
        <Text style={styles.btnText}>
          {unit === "metric"
            ? "Change to imperial units"
            : "Change to metric units"}
        </Text>
      </TouchableOpacity> */}
      <View style={styles.pointsContainer}>
        {ingredients?.map((ingredient: ingredient) => (
          <View
            style={styles.pointWrapper}
            key={ingredient.amount + ingredient.name}
          >
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>
              {ingredient.name}: {ingredient.amount} {ingredient.unit}
            </Text>
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
