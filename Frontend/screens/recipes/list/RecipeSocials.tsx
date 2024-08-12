import React, { useState, useEffect, useCallback } from "react";
import {
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { DATA_BASE } from "@/firebaseCONFIG";
import { RecipeType } from "@/utils/recipes/RecipesTypes";
import { getUserId, getUserDocSnap } from "@/utils/social/User";
import {
  likeHandler,
  saveHandler,
  commentHandler,
} from "@/utils/social/SocialHandlers";
import SocialTabs from "@/components/social/SocialTabs";
type Props = {
  recipe: RecipeType;
};

export default function RecipeSocials({ recipe }: Props) {
  const [heart, setHeart] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [commentRefs, setCommentRefs] = useState<
    DocumentReference<DocumentData, DocumentData>[]
  >([]);
  const recipeId = String(recipe.id);

  const recipeRef: DocumentReference<DocumentData, DocumentData> = doc(
    DATA_BASE,
    "Recipes",
    recipeId
  );

  /**
   * Sets the heart symbol and number of likes of the recipe
   */
  const getRecipeLikes = useCallback(async () => {
    const recipe = await getDoc(recipeRef);
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
      setDoc(recipeRef, {
        likes: [],
        comments: [],
      });
    }
  }, []);

  /**
   * Sets the saved symbol to whether the recipe is saved by the user
   */
  const getRecipeSaved = useCallback(async () => {
    const userData = (await getUserDocSnap()).data();
    if (
      userData?.savedRecipes.some(
        (ref: DocumentReference<DocumentData, DocumentData>) =>
          ref.path === recipeRef.path
      )
    ) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, []);

  /**
   * Sets the array of recipe's comments
   */
  const getRecipeComments = useCallback(async (): Promise<void> => {
    const recipe = await getDoc(recipeRef);
    const data = recipe.data();
    setCommentRefs(data?.comments.reverse());
  }, []);

  useEffect(() => {
    getRecipeLikes();
    getRecipeSaved();
    getRecipeComments();
  }, []);

  /**
   * Custom recipe like handler
   */
  const likeButtonHandler = useCallback(() => {
    likeHandler(setHeart, setLikes, recipeRef);
  }, []);

  /**
   * Custom recipe save handler
   */
  const saveButtonHandler = useCallback(() => {
    saveHandler(setSaved, recipeRef, "savedRecipes");
  }, []);

  /**
   * Custom recipe comment handler
   */
  const commentButtonHandler = useCallback(
    async (trimmedBody: string): Promise<void> => {
      await commentHandler(trimmedBody, recipeRef, "RecipesComments");
      getRecipeComments();
    },
    []
  );

  return (
    <SocialTabs
      heart={heart}
      saved={saved}
      likes={likes}
      likeButtonHandler={likeButtonHandler}
      saveButtonHandler={saveButtonHandler}
      commentRefs={commentRefs}
      commentButtonHandler={commentButtonHandler}
    />
  );
}
