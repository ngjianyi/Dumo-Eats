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
import DailyAllowance from "@/utils/recipes/DailyAllowances";

type Props = {
  item: Recipe;
};

export default function RecipeDisplay({ item }: Props) {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    DailyAllowance(item.nutrition.nutrients).then((res) => {
      setBenefits(res[0]);
      setWarnings(res[1]);
    });
  }, []);

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
        <Text style={styles.benefit}>
          {benefits.length > 0 && "High in " + benefits.join(", ")}
        </Text>
        <Text style={styles.warning}>
          {warnings.length > 0 ? "High in " + warnings.join(", ") : <View />}
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
  },
  warning: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.tertiary,
    marginTop: 3,
  },
  benefit: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: "forestgreen",
    marginTop: 3,
  },
});
