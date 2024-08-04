import { FlatList, View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import capitaliseFirstLetter from "@/utils/functions/Capitalise/Capitalise";
import { Recipe, Instruction, Step } from "@/utils/recipes/RecipesTypes";

type Props = {
  recipe: Recipe;
};

export default function Instructions({ recipe }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <FlatList
          data={recipe?.analyzedInstructions}
          renderItem={({ item, index }) => {
            return (
              <View key={index}>
                <Text>{item.name}</Text>

                <FlatList
                  data={item.steps}
                  renderItem={({ item }) => (
                    <View
                      style={styles.pointWrapper}
                      key={index.toString() + item.number}
                    >
                      <View style={styles.pointDot} />
                      <Text style={styles.pointText}>
                        {index + 1}.{item.number}
                        {": "}
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: SIZES.medium,
    flex: 1,
  },
  pointsContainer: {
    marginVertical: SIZES.small,
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
});
