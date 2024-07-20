import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import capitaliseFirstLetter from "@/utils/functions/Capitalise";
import { Recipe } from "@/utils/recipes/RecipesTypes";

type Props = {
  recipe: Recipe;
};

export default function Instructions({ recipe }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        {recipe?.analyzedInstructions.map((item) => (
          <View key={item.name}>
            <View>{item.name}</View>
            {item?.steps?.map((step) => (
              <View style={styles.pointWrapper} key={item.name + step.number}>
                <View style={styles.pointDot} />
                <Text style={styles.pointText}>
                  {step.number}. {capitaliseFirstLetter(step.step)}
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
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    // fontFamily: FONT.bold,
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
    // fontFamily: FONT.regular,
    marginLeft: SIZES.small,
  },
});
