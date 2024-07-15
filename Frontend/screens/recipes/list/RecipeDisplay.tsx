import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DATA_BASE } from "@/firebaseCONFIG";
import { doc, getDoc, setDoc, DocumentReference } from "firebase/firestore";
import { COLORS, SIZES, SHADOWS } from "@/constants/Theme";
import { getUserId, getUserDocSnap } from "@/utils/social/User";
import SocialTabs from "@/components/social/SocialTabs";
import { likeHandler, recipesSaveHandler } from "@/utils/social/SocialHandlers";
import RecipeIndivScreen from "../indiv/RecipeIndivScreen";
import { Recipe } from "@/utils/recipes/RecipesTypes";
import { CommentType } from "@/utils/social/SocialTypes";

type Props = {
  item: Recipe;
};

export default function RecipeDisplay({ item }: Props) {
  const [heart, setHeart] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<DocumentReference[]>([]);
  const itemId = String(item.id);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

  const recipesRef = doc(DATA_BASE, "Recipes", itemId);

  const getRecipeLikes = async () => {
    const recipe = await getDoc(recipesRef);
    if (recipe.exists()) {
      const data = recipe.data();
      if (data.likes.includes(getUserId())) {
        setHeart(true);
      } else {
        setHeart(false);
      }
      setLikes(data.likes.length);
    } else {
      setHeart(false);
      setLikes(0);
      setDoc(
        recipesRef,
        {
          likes: [],
        },
        { merge: true }
      );
    }
  };

  const getRecipeSaved = async () => {
    const userData = (await getUserDocSnap()).data();
    if (userData?.savedRecipes.includes(itemId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  };

  const getRecipeComments = async () => {
    const recipe = await getDoc(recipesRef);
    if (recipe.exists()) {
      const data = recipe.data();
      setComments(data.comments.reverse());
    } else {
      setComments([]);
      setDoc(
        recipesRef,
        {
          comments: [],
        },
        { merge: true }
      );
    }
  };

  useEffect(() => {
    getRecipeLikes();
    getRecipeSaved();
    getRecipeComments();
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
        <TouchableOpacity onPress={() => setDetailsVisible(true)}>
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
          commentRefs={comments}
        />
      </View>

      <TouchableOpacity style={styles.logoContainer}>
        <Image src={item.image} resizeMode="contain" style={styles.image} />
      </TouchableOpacity>

      <Modal visible={detailsVisible} animationType="slide">
        <RecipeIndivScreen
          setDetailsVisible={setDetailsVisible}
          recipe={item}
        />
      </Modal>
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
