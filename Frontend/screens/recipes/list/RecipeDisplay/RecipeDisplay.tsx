import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import RecipeSocials from ".././RecipeSocials";
import RecipeIndivScreen from "../../indiv/RecipeIndivScreen";
import { Recipe } from "@/utils/recipes/RecipesTypes";
import { COLORS, SIZES, SHADOWS } from "@/constants/Theme";
import { getUserDocSnap } from "@/utils/social/User";

type Props = {
  item: Recipe;
};

export default function RecipeDisplay({ item }: Props) {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const getWarnings = async () => {
    const user = await getUserDocSnap();
    const calorieGoal = user.data()?.calorieGoal;
    const caloriesLeft = user.data()?.calorieGoal - user.data()?.currentCalorie;
    const currWarnings: string[] = [];
    for (let i = 0; i < item.nutrition.nutrients.length; i++) {
      if (item.nutrition.nutrients[i].name === "Calories") {
        if (
          item.nutrition.nutrients[i].amount > calorieGoal / 3 ||
          item.nutrition.nutrients[i].amount > caloriesLeft
        ) {
          currWarnings.push("calories");
        }
      } else if (item.nutrition.nutrients[i].name === "Saturated Fat") {
        if (item.nutrition.nutrients[i].percentOfDailyNeeds > 50) {
          currWarnings.push("aturated fat");
        }
      } else if (item.nutrition.nutrients[i].name === "Sugar") {
        if (item.nutrition.nutrients[i].percentOfDailyNeeds > 50) {
          currWarnings.push("sugar");
        }
      } else if (item.nutrition.nutrients[i].name === "Cholesterol") {
        if (item.nutrition.nutrients[i].percentOfDailyNeeds > 50) {
          currWarnings.push("cholesterol");
        }
      } else if (item.nutrition.nutrients[i].name === "Sodium") {
        if (item.nutrition.nutrients[i].percentOfDailyNeeds > 50) {
          currWarnings.push("sodium");
        }
      }
    }
    setWarnings(currWarnings);
  };

  useEffect(() => {
    getWarnings()
  })

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => setDetailsVisible(true)}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>

        <Text style={styles.calories}>
          Calories: {Math.ceil(item.nutrition.nutrients[0].amount)}
        </Text>
        <Text style={styles.warning}>
          {warnings.length != 0? "High in " + warnings.join(", ") : null}
        </Text>

        <RecipeSocials recipe={item} />
      </View>

      <TouchableOpacity style={styles.logoContainer}>
        <Image src={item.image} resizeMode="contain" style={styles.image} />
      </TouchableOpacity>

      <Modal
        visible={detailsVisible}
        animationType="slide"
        onRequestClose={() => {
          () => setDetailsVisible(false);
        }}
      >
        <RecipeIndivScreen
          setDetailsVisible={setDetailsVisible}
          recipe={item}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  image: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  calories: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },

  warning: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.tertiary,
    marginTop: 3,
  },
});
