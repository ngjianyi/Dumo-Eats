import { useContext } from "react";
import { RecipeContext } from "../RecipeProvider";
import { View, Text, StyleSheet } from "react-native";
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
  capitalizeFirstLetter: (string: string) => string;
};

export default function () {
  //   const [unit, setUnit] = useState("metric");
  const { recipe, setRecipe, capitalizeFirstLetter } =
    useContext<any>(RecipeContext);

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
        {recipe?.nutrition.ingredients.map((ingredient: ingredient) => (
          <View style={styles.pointWrapper} key={ingredient.name}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>
              {capitalizeFirstLetter(ingredient.name)}: {ingredient.amount}{" "}
              {ingredient.unit}
            </Text>
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
});
