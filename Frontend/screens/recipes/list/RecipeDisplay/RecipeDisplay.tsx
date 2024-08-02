import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  const [message, setMessage] = useState<string[]>([]);
  const [colour, setColour] = useState<string>("black");

  useEffect(() => {
    DailyAllowance(item.nutrition.nutrients).then((res) => {
      setBenefits(res[0]);
      setWarnings(res[1]);
    });
  }, []);

  const benefitHandler = () => {
    if (message == benefits) {
      setMessage([]);
      setColour("black");
    } else {
      setMessage(benefits);
      setColour("forestgreen");
    }
  };

  const warningHandler = () => {
    if (message == warnings) {
      setMessage([]);
      setColour("black");
    } else {
      setMessage(warnings);
      setColour("red");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => setDetailsVisible(true)}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>

        <View style={styles.details}>
          <Text style={styles.calories}>
            Calories: {Math.ceil(item.nutrition.nutrients[0].amount)}
          </Text>

          {benefits.length > 0 && (
            <TouchableOpacity onPress={benefitHandler}>
              <Ionicons
                name="alert-circle"
                size={SIZES.large}
                color="forestgreen"
                style={styles.labels}
              />
            </TouchableOpacity>
          )}

          {warnings.length > 0 && (
            <TouchableOpacity onPress={warningHandler}>
              <Ionicons
                name="warning"
                size={SIZES.large}
                color="red"
                style={styles.labels}
              />
            </TouchableOpacity>
          )}
        </View>

        {message.length > 0 && (
          <Text style={{ color: colour }}>High in {message.join(", ")}</Text>
        )}

        <RecipeSocials recipe={item} />
      </View>

      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => setDetailsVisible(true)}
      >
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
    width: 70,
    height: 53,
    marginLeft: SIZES.small,
  },
  image: {
    width: "100%",
    height: "100%",
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  calories: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
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
  labels: {
    paddingLeft: SIZES.xSmall / 2,
  },
});
