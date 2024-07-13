import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { DATA_BASE } from "@/firebaseCONFIG";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { RecipeContext } from "@/screens/recipes/RecipeProvider";
import { COLORS, SIZES, SHADOWS } from "@/constants/Theme";
import { getUserId, getUserDocSnap } from "@/utils/social/User";
import SocialTabs from "@/components/social/SocialTabs";
import { likeHandler, recipesSaveHandler } from "@/utils/social/SocialHandlers";

type docData = {
  likes: string[];
};

export default function RecipeDisplay({ navigation, item }: any) {
  const { setRecipe } = useContext<any>(RecipeContext);
  const [heart, setHeart] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const itemId = String(item.id);

  const handlePress = (item: any) => {
    setRecipe(item);
    navigation.navigate("indiv");
  };

  const recipesRef = doc(DATA_BASE, "Recipes", itemId);

  const setRecipeLikes = async () => {
    const recipe = await getDoc(recipesRef);
    if (recipe.exists()) {
      const data: any = recipe.data();
      if (data.likes.includes(getUserId())) {
        setHeart(true);
      } else {
        setHeart(false);
      }
      setLikes(data.likes.length);
    } else {
      const docData: docData = {
        likes: [],
      };
      await setDoc(recipesRef, docData);
      setHeart(false);
      setLikes(0);
    }
  };

  const setRecipeSaved = async () => {
    const userData = (await getUserDocSnap()).data();
    if (userData?.savedRecipes.includes(itemId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  };

  useEffect(() => {
    setRecipeLikes();
    setRecipeSaved();
  }, []);

  const likeButtonHandler = () => {
    likeHandler(setHeart, setLikes, recipesRef);
  };

  const saveButtonHandler = () => {
    recipesSaveHandler(setSaved, itemId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableOpacity>

        <Text style={styles.calories}>
          {/* First nutrient is calorie */}
          Calories: {Math.ceil(item.nutrition.nutrients[0].amount)}
        </Text>

        <SocialTabs
          heart={heart}
          saved={saved}
          likes={likes}
          likeButtonHandler={likeButtonHandler}
          saveButtonHandler={saveButtonHandler}
        />
      </View>

      <TouchableOpacity style={styles.logoContainer}>
        <Image src={item.image} resizeMode="contain" style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
  },
  list: {
    flex: 1,
  },
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
});
