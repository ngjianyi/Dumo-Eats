import React, { useState, useEffect, useCallback } from "react";
import {
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { DATA_BASE } from "@/firebaseCONFIG";
import { Recipe } from "@/utils/recipes/RecipesTypes";
import { getUserId, getUserDocSnap } from "@/utils/social/User";
import {
  likeHandler,
  recipeSaveHandler,
  recipeCommentHandler,
} from "@/utils/social/SocialHandlers";
import SocialTabs from "@/components/social/SocialTabs";

type Props = {
  recipe: Recipe;
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
      setDoc(
        recipeRef,
        {
          likes: [],
          comments: [],
        },
        { merge: true }
      );
    }
  }, []);

  const getRecipeSaved = useCallback(async () => {
    const userData = (await getUserDocSnap()).data();
    if (userData?.savedRecipes.includes(recipeId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, []);

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

  const likeButtonHandler = useCallback(() => {
    likeHandler(setHeart, setLikes, recipeRef);
  }, []);

  const saveButtonHandler = useCallback(() => {
    recipeSaveHandler(setSaved, recipeId);
  }, []);

  const commentButtonHandler = useCallback(
    async (trimmedBody: string): Promise<void> => {
      await recipeCommentHandler(trimmedBody, recipeRef);
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
