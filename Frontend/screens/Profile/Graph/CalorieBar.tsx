import { Text, View, StyleSheet, DimensionValue } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { COLORS, SIZES } from "@/constants/Theme";

interface props {
  calorie: number;
  prog: number;
  yLabel: string;
}
/**
 *
 * @param prog ratio of each bar to the screeen size
 * @returns percentage value of ratio
 */
const getWidth = (prog: number): DimensionValue | undefined => {
  if (prog > 1) {
    prog = 1;
  }
  const numString: string = String(prog * 100);
  const width: DimensionValue | undefined = `${numString}%` as DimensionValue;
  return width;
};

export default function CalorieBar({ calorie, prog, yLabel }: props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.word}>{yLabel}</Text>
      </View>

      <View style={{ width: getWidth(prog) }}>
        <Progress.Bar
          progress={1}
          width={null}
          height={SIZES.medium * 2}
          borderRadius={SIZES.medium}
          color={COLORS.blue}
        />
      </View>

      <View style={{ marginLeft: 5 }}>
        <Text style={styles.word}>{calorie}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: { marginRight: SIZES.small, width: "20%" },
  word: {
    fontSize: SIZES.medium,
    color: "black",
  },
});
